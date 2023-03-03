-- Calculate average orders per day

SELECT
	ROUND(AVG(`count`), 0) as `average`
FROM (
	SELECT
		DATE(o.created_at) AS `work_day`,
		COUNT(o.id) AS `count`
	FROM poscoffee.orders AS o
		INNER JOIN poscoffee.order_line_join as j ON j.order_id = o.id
		INNER JOIN poscoffee.order_lines as l ON j.line_id = l.id
	GROUP BY `work_day`
) AS `work_day_count`;
