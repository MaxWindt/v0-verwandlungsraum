import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_offers_dialog_type" AS ENUM('details', 'session', 'canva', 'kennenlernabend');
  CREATE TYPE "public"."enum_offers_category" AS ENUM('individual', 'workshop');
  CREATE TYPE "public"."enum_offers_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__offers_v_version_dialog_type" AS ENUM('details', 'session', 'canva', 'kennenlernabend');
  CREATE TYPE "public"."enum__offers_v_version_category" AS ENUM('individual', 'workshop');
  CREATE TYPE "public"."enum__offers_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "offers_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "offers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"title_en" varchar,
  	"title_es" varchar,
  	"short_description" varchar,
  	"short_description_en" varchar,
  	"short_description_es" varchar,
  	"card_image_id" integer,
  	"image_id" integer,
  	"external_image_url" varchar,
  	"registration_url" varchar,
  	"location" varchar,
  	"participants" varchar,
  	"duration" varchar,
  	"price" varchar,
  	"dialog_type" "enum_offers_dialog_type" DEFAULT 'details',
  	"canva_url" varchar,
  	"dialog_content" jsonb,
  	"hidden" boolean DEFAULT false,
  	"event_date" timestamp(3) with time zone,
  	"category" "enum_offers_category" DEFAULT 'workshop',
  	"order" numeric,
  	"last_saved_by" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_offers_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_offers_v_version_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_title_en" varchar,
  	"version_title_es" varchar,
  	"version_short_description" varchar,
  	"version_short_description_en" varchar,
  	"version_short_description_es" varchar,
  	"version_card_image_id" integer,
  	"version_image_id" integer,
  	"version_external_image_url" varchar,
  	"version_registration_url" varchar,
  	"version_location" varchar,
  	"version_participants" varchar,
  	"version_duration" varchar,
  	"version_price" varchar,
  	"version_dialog_type" "enum__offers_v_version_dialog_type" DEFAULT 'details',
  	"version_canva_url" varchar,
  	"version_dialog_content" jsonb,
  	"version_hidden" boolean DEFAULT false,
  	"version_event_date" timestamp(3) with time zone,
  	"version_category" "enum__offers_v_version_category" DEFAULT 'workshop',
  	"version_order" numeric,
  	"version_last_saved_by" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__offers_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"prefix" varchar DEFAULT '',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"offers_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"welcome_intro" jsonb,
  	"welcome_image_id" integer,
  	"about_paragraph1" jsonb,
  	"about_paragraph2" jsonb,
  	"about_paragraph3" jsonb,
  	"about_portrait_id" integer,
  	"session_description1" jsonb,
  	"session_description2" jsonb,
  	"session_description3" jsonb,
  	"session_description4" jsonb,
  	"session_description5" jsonb,
  	"session_room_image_id" integer,
  	"session_prices_title" varchar,
  	"session_prices_content" jsonb,
  	"session_billing_title" varchar,
  	"session_billing_content" jsonb,
  	"session_advantages_title" varchar,
  	"session_advantages_content" jsonb,
  	"session_cancellation_title" varchar,
  	"session_cancellation_content" jsonb,
  	"session_disclaimer_title" varchar,
  	"session_disclaimer_content" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_site_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_welcome_intro" jsonb,
  	"version_welcome_image_id" integer,
  	"version_about_paragraph1" jsonb,
  	"version_about_paragraph2" jsonb,
  	"version_about_paragraph3" jsonb,
  	"version_about_portrait_id" integer,
  	"version_session_description1" jsonb,
  	"version_session_description2" jsonb,
  	"version_session_description3" jsonb,
  	"version_session_description4" jsonb,
  	"version_session_description5" jsonb,
  	"version_session_room_image_id" integer,
  	"version_session_prices_title" varchar,
  	"version_session_prices_content" jsonb,
  	"version_session_billing_title" varchar,
  	"version_session_billing_content" jsonb,
  	"version_session_advantages_title" varchar,
  	"version_session_advantages_content" jsonb,
  	"version_session_cancellation_title" varchar,
  	"version_session_cancellation_content" jsonb,
  	"version_session_disclaimer_title" varchar,
  	"version_session_disclaimer_content" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "offers_dates" ADD CONSTRAINT "offers_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers" ADD CONSTRAINT "offers_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offers" ADD CONSTRAINT "offers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v_version_dates" ADD CONSTRAINT "_offers_v_version_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v" ADD CONSTRAINT "_offers_v_parent_id_offers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."offers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v" ADD CONSTRAINT "_offers_v_version_card_image_id_media_id_fk" FOREIGN KEY ("version_card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v" ADD CONSTRAINT "_offers_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_offers_fk" FOREIGN KEY ("offers_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content" ADD CONSTRAINT "site_content_welcome_image_id_media_id_fk" FOREIGN KEY ("welcome_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_content" ADD CONSTRAINT "site_content_about_portrait_id_media_id_fk" FOREIGN KEY ("about_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_content" ADD CONSTRAINT "site_content_session_room_image_id_media_id_fk" FOREIGN KEY ("session_room_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_content_v" ADD CONSTRAINT "_site_content_v_version_welcome_image_id_media_id_fk" FOREIGN KEY ("version_welcome_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_content_v" ADD CONSTRAINT "_site_content_v_version_about_portrait_id_media_id_fk" FOREIGN KEY ("version_about_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_content_v" ADD CONSTRAINT "_site_content_v_version_session_room_image_id_media_id_fk" FOREIGN KEY ("version_session_room_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "offers_dates_order_idx" ON "offers_dates" USING btree ("_order");
  CREATE INDEX "offers_dates_parent_id_idx" ON "offers_dates" USING btree ("_parent_id");
  CREATE INDEX "offers_card_image_idx" ON "offers" USING btree ("card_image_id");
  CREATE INDEX "offers_image_idx" ON "offers" USING btree ("image_id");
  CREATE INDEX "offers_hidden_idx" ON "offers" USING btree ("hidden");
  CREATE INDEX "offers_event_date_idx" ON "offers" USING btree ("event_date");
  CREATE INDEX "offers_order_idx" ON "offers" USING btree ("order");
  CREATE INDEX "offers_updated_at_idx" ON "offers" USING btree ("updated_at");
  CREATE INDEX "offers_created_at_idx" ON "offers" USING btree ("created_at");
  CREATE INDEX "offers__status_idx" ON "offers" USING btree ("_status");
  CREATE INDEX "_offers_v_version_dates_order_idx" ON "_offers_v_version_dates" USING btree ("_order");
  CREATE INDEX "_offers_v_version_dates_parent_id_idx" ON "_offers_v_version_dates" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_parent_idx" ON "_offers_v" USING btree ("parent_id");
  CREATE INDEX "_offers_v_version_version_card_image_idx" ON "_offers_v" USING btree ("version_card_image_id");
  CREATE INDEX "_offers_v_version_version_image_idx" ON "_offers_v" USING btree ("version_image_id");
  CREATE INDEX "_offers_v_version_version_hidden_idx" ON "_offers_v" USING btree ("version_hidden");
  CREATE INDEX "_offers_v_version_version_event_date_idx" ON "_offers_v" USING btree ("version_event_date");
  CREATE INDEX "_offers_v_version_version_order_idx" ON "_offers_v" USING btree ("version_order");
  CREATE INDEX "_offers_v_version_version_updated_at_idx" ON "_offers_v" USING btree ("version_updated_at");
  CREATE INDEX "_offers_v_version_version_created_at_idx" ON "_offers_v" USING btree ("version_created_at");
  CREATE INDEX "_offers_v_version_version__status_idx" ON "_offers_v" USING btree ("version__status");
  CREATE INDEX "_offers_v_created_at_idx" ON "_offers_v" USING btree ("created_at");
  CREATE INDEX "_offers_v_updated_at_idx" ON "_offers_v" USING btree ("updated_at");
  CREATE INDEX "_offers_v_latest_idx" ON "_offers_v" USING btree ("latest");
  CREATE INDEX "_offers_v_autosave_idx" ON "_offers_v" USING btree ("autosave");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_offers_id_idx" ON "payload_locked_documents_rels" USING btree ("offers_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_content_welcome_image_idx" ON "site_content" USING btree ("welcome_image_id");
  CREATE INDEX "site_content_about_portrait_idx" ON "site_content" USING btree ("about_portrait_id");
  CREATE INDEX "site_content_session_room_image_idx" ON "site_content" USING btree ("session_room_image_id");
  CREATE INDEX "_site_content_v_version_version_welcome_image_idx" ON "_site_content_v" USING btree ("version_welcome_image_id");
  CREATE INDEX "_site_content_v_version_version_about_portrait_idx" ON "_site_content_v" USING btree ("version_about_portrait_id");
  CREATE INDEX "_site_content_v_version_version_session_room_image_idx" ON "_site_content_v" USING btree ("version_session_room_image_id");
  CREATE INDEX "_site_content_v_created_at_idx" ON "_site_content_v" USING btree ("created_at");
  CREATE INDEX "_site_content_v_updated_at_idx" ON "_site_content_v" USING btree ("updated_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "offers_dates" CASCADE;
  DROP TABLE "offers" CASCADE;
  DROP TABLE "_offers_v_version_dates" CASCADE;
  DROP TABLE "_offers_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_content" CASCADE;
  DROP TABLE "_site_content_v" CASCADE;
  DROP TYPE "public"."enum_offers_dialog_type";
  DROP TYPE "public"."enum_offers_category";
  DROP TYPE "public"."enum_offers_status";
  DROP TYPE "public"."enum__offers_v_version_dialog_type";
  DROP TYPE "public"."enum__offers_v_version_category";
  DROP TYPE "public"."enum__offers_v_version_status";`)
}
