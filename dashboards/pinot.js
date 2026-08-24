// Thin client for Apache Pinot's /sql broker endpoint. Credentials live only in
// sessionStorage (never written to disk), entered fresh each browser session.
const Pinot = (() => {
  let baseUrl = "";
  let authHeader = "";

  function configure(url, user, pass) {
    baseUrl = url.replace(/\/+$/, "");
    authHeader = "Basic " + btoa(`${user}:${pass}`);
  }

  function restoreFromSession() {
    const url = sessionStorage.getItem("pinot.url");
    const user = sessionStorage.getItem("pinot.user");
    const pass = sessionStorage.getItem("pinot.pass");
    if (url && user && pass) {
      configure(url, user, pass);
      return true;
    }
    return false;
  }

  function persistToSession(url, user, pass) {
    sessionStorage.setItem("pinot.url", url);
    sessionStorage.setItem("pinot.user", user);
    sessionStorage.setItem("pinot.pass", pass);
  }

  function clearSession() {
    sessionStorage.removeItem("pinot.url");
    sessionStorage.removeItem("pinot.user");
    sessionStorage.removeItem("pinot.pass");
  }

  async function testConnection() {
    const res = await fetch(`${baseUrl}/tables`, {
      headers: { Authorization: authHeader },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  // Runs a SQL query, returns {columns, rows} with rows as plain JS values.
  async function query(sql) {
    const res = await fetch(`${baseUrl}/sql`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.exceptions && data.exceptions.length) {
      throw new Error(data.exceptions.map((e) => e.message).join("; "));
    }
    const table = data.resultTable;
    if (!table) return { columns: [], rows: [] };
    return { columns: table.dataSchema.columnNames, rows: table.rows };
  }

  // Convenience: query -> array of row objects keyed by column name.
  async function queryObjects(sql) {
    const { columns, rows } = await query(sql);
    return rows.map((r) => Object.fromEntries(columns.map((c, i) => [c, r[i]])));
  }

  return {
    configure,
    restoreFromSession,
    persistToSession,
    clearSession,
    testConnection,
    query,
    queryObjects,
    get isConfigured() {
      return !!baseUrl;
    },
  };
})();
