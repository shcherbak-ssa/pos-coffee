-- Get sorted products by count used in orders

(SELECT
	SUM(l.count) AS `count`,
  CONCAT_WS(", ", p.name, v.name) AS `name`
FROM
	poscoffee.order_lines AS l
INNER JOIN
	poscoffee.products AS p ON p.id = l.product_id
INNER JOIN
	poscoffee.product_variants AS v ON v.id = l.variant_id
GROUP BY `name`)

UNION ALL

(SELECT
	SUM(l.count) AS `count`,
  p.name AS `name`
FROM
	poscoffee.order_lines AS l
INNER JOIN
	poscoffee.products AS p ON p.id = l.product_id
WHERE
	l.variant_id IS null
GROUP BY `name`)

ORDER BY `count` ?
LIMIT 5;
