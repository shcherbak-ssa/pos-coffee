-- Search by product name and variant name

SELECT DISTINCT
	r.id AS `id`,
  r.image AS `image`,
  r.name AS `name`,
  c.name AS `category`
FROM (
	(SELECT
		`id`, `image`, `name`, `category_id`
	FROM
		poscoffee.products
	WHERE
		`name` LIKE "%?%")

	UNION ALL

	(SELECT
		DISTINCT p.id AS `id`,
		p.image AS `image`,
		p.name AS `name`,
    p.category_id AS `category_id`
	FROM
		poscoffee.products AS p
		INNER JOIN poscoffee.product_variants AS v ON p.id = v.product_id
	WHERE
		v.name LIKE "%?%")
) AS r
INNER JOIN poscoffee.categories AS c ON c.id = r.category_id
ORDER BY `id`;
