-- Calculate average income per day

SELECT
	ROUND(AVG(`income`), 2) AS `average`
FROM (
	SELECT
		DATE(o.created_at) AS `work_day`,
		ROUND(SUM((l.count * l.price) * ((100 + o.taxes) / 100)), 2) AS `income`
	FROM poscoffee.orders AS o
		INNER JOIN poscoffee.order_line_join as j ON j.order_id = o.id
		INNER JOIN poscoffee.order_lines as l ON j.line_id = l.id
	GROUP BY `work_day`
) AS `work_day_sum`;
