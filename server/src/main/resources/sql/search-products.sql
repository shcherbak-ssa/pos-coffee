-- Search by product name and variant name

SELECT DISTINCT * FROM (
	(SELECT
		`id`, `image`, `name`
	FROM
		poscoffee.products
	WHERE
		`name` LIKE "%?%")

	UNION ALL

	(SELECT
		DISTINCT p.id AS `id`,
		p.image AS `image`,
		p.name AS `name`
	FROM
		poscoffee.products AS p
		INNER JOIN poscoffee.product_variants AS v ON p.id = v.product_id
	WHERE
		v.name LIKE "%?%")
) AS result ORDER BY `id`;
