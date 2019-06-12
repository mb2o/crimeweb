select county, count(*) as moorden
from people p
join cities c on lower(c.cityname) = lower(p.deathcity)
where p.deathcountry_id = 156 and mannerofdeath_id = 38
group by county
order by county