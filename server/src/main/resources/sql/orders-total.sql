-- Calculate total orders and income

SELECT
  COUNT(DISTINCT o.id) AS `orders`,
  ROUND(SUM((l.count * l.price) * ((100 + o.taxes) / 100)), 2) AS `income`
FROM poscoffee.orders AS o
  INNER JOIN poscoffee.order_line_join as j ON j.order_id = o.id
  INNER JOIN poscoffee.order_lines as l ON j.line_id = l.id;
