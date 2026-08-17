-- Nanoheal DEX V2 — production-oriented SQL templates
-- Always filter customer_id + time. Prefer percentiles and affected counts over AVG.
-- Replace :customer_id, :from_ms, :to_ms with parameters.

-- DV-02 CPU percentiles by device
SELECT machine_id, user_name, device_group,
  PERCENTILE(metric_value, 50) AS p50,
  PERCENTILE(metric_value, 90) AS p90,
  PERCENTILE(metric_value, 95) AS p95,
  PERCENTILE(metric_value, 99) AS p99,
  MAX(metric_value) AS max_cpu,
  AVG(metric_value) AS avg_cpu_secondary,
  SUM(CASE WHEN metric_value >= 90 THEN 1 ELSE 0 END) AS high_cpu_samples,
  COUNT(*) AS samples
FROM system_telemetry_metrics_v2
WHERE customer_id = :customer_id
  AND metric_name = 'cpu_usage_pct'
  AND server_time >= :from_ms AND server_time < :to_ms
GROUP BY machine_id, user_name, device_group
ORDER BY p95 DESC;

-- DV-04 Disk critical persistence
SELECT machine_id, user_name, device_group,
  MIN(metric_value) AS min_free,
  PERCENTILE(metric_value, 10) AS p10_free,
  SUM(CASE WHEN metric_value < 15 THEN 1 ELSE 0 END) AS critical_samples,
  COUNT(*) AS samples
FROM system_telemetry_metrics_v2
WHERE customer_id = :customer_id
  AND metric_name = 'disk_free_pct'
  AND server_time >= :from_ms AND server_time < :to_ms
GROUP BY machine_id, user_name, device_group
HAVING MIN(metric_value) < 15
ORDER BY min_free ASC;

-- NW-01 Network RTT outliers
SELECT machine_id, user_name, device_group,
  PERCENTILE(metric_value, 50) AS p50_rtt,
  PERCENTILE(metric_value, 95) AS p95_rtt,
  MAX(metric_value) AS max_rtt,
  COUNT(*) AS samples
FROM network_telemetry_v2
WHERE customer_id = :customer_id
  AND metric_name = 'round_trip_time'
  AND server_time >= :from_ms AND server_time < :to_ms
GROUP BY machine_id, user_name, device_group
ORDER BY p95_rtt DESC;

-- AP-01 Application reliability
SELECT application_name,
  COUNT(*) AS crash_events,
  COUNT(DISTINCT machine_id) AS devices_affected,
  COUNT(DISTINCT user_name) AS users_affected
FROM events_v2
WHERE customer_id = :customer_id
  AND event_type = 'Application Error'
  AND server_time >= :from_ms AND server_time < :to_ms
GROUP BY application_name
ORDER BY crash_events DESC
LIMIT 50;

-- AU-02 Remediation success rate
SELECT
  SUM(CASE WHEN event_status = 'completed' THEN 1 ELSE 0 END) AS completed,
  SUM(CASE WHEN event_status = 'failed' THEN 1 ELSE 0 END) AS failed,
  COUNT(*) AS total
FROM events_v2
WHERE customer_id = :customer_id
  AND event_domain = 'remediation'
  AND server_time >= :from_ms AND server_time < :to_ms;

-- URL-01 SaaS latency
SELECT domain,
  PERCENTILE(metric_value, 50) AS p50_ms,
  PERCENTILE(metric_value, 95) AS p95_ms,
  SUM(CASE WHEN status_code >= 500 THEN 1 ELSE 0 END) AS errors_5xx,
  COUNT(*) AS samples,
  COUNT(DISTINCT machine_id) AS devices
FROM url_telemetry_v2
WHERE customer_id = :customer_id
  AND metric_name = 'http_response_time'
  AND server_time >= :from_ms AND server_time < :to_ms
GROUP BY domain
ORDER BY p95_ms DESC;

-- EP-01 Compliance posture
SELECT compliance_control, compliance_status,
  COUNT(DISTINCT machine_id) AS devices,
  COUNT(*) AS observations
FROM compliance_v2
WHERE customer_id = :customer_id
  AND server_time >= :from_ms AND server_time < :to_ms
GROUP BY compliance_control, compliance_status;
