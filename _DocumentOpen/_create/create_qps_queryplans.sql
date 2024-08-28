-- drop table qps_queryplans
-- qps_queryplansテーブル


CREATE TABLE qps_queryplans (
    id SERIAL,
    user_id integer not null,
    title text not NULL,
    xml text  not NULL,
    xml_hash text not NULL,
    is_archive boolean NOT NULL,
    is_open boolean NOT NULL,
    create_at TIMESTAMP without time zone,
    update_at TIMESTAMP without time zone  ,
    CONSTRAINT qps_queryplans_id_pkey PRIMARY KEY (id)
);

GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon;


GRANT USAGE ON SEQUENCE qps_queryplans_id_seq TO anon;
GRANT USAGE ON SEQUENCE qps_queryplans_id_seq TO authenticated;


/*
SELECT sequence_name
FROM information_schema.sequences
WHERE sequence_schema = 'public';
*/