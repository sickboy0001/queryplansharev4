-- qps_queryplans_list_view
CREATE VIEW qps_queryplans_list_view AS
SELECT plans.id 
  , uuid.uuid 
  , title 
  , xml 
  , xml_hash 
  , is_archive
  , is_open
  , create_at
  , update_at
FROM qps_queryplans AS plans
LEFT OUTER JOIN qps_queryplans_linkedurl AS uuid 
ON uuid.queryplans_id =  plans.id

GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

GRANT SELECT ON qps_queryplans_list_view  TO authenticated;
GRANT SELECT ON qps_queryplans_list_view  TO anon;


/*
SELECT sequence_name
FROM information_schema.sequences
WHERE sequence_schema = 'public';
*/