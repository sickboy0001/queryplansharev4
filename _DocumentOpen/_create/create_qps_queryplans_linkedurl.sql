-- drop table qps_queryplans_linkedurl
-- create_qps_queryplans_linkedurl
CREATE TABLE qps_queryplans_linkedurl (
    id SERIAL,
    queryplans_id int NOT NULL,
    uuid text NOT NULL,
    CONSTRAINT qps_queryplans_linkedurl_id_pkey PRIMARY KEY (id)
);



GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon;


GRANT USAGE ON SEQUENCE qps_queryplans_linkedurl_id_seq TO anon;
GRANT USAGE ON SEQUENCE qps_queryplans_linkedurl_id_seq TO authenticated;


/*
SELECT sequence_name
FROM information_schema.sequences
WHERE sequence_schema = 'public';
*/