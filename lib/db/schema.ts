import { boolean, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const files = pgTable('files', {
    id: uuid('id').defaultRandom().primaryKey(),

    // file folder information
    name: text('name').notNull(),
    path: text('path').notNull(), // document/project/resume.pdf
    size: integer('size').notNull(),
    type: text('type').notNull(), // folder or file
    
    // storage info
    fileUrl: text('file_url').notNull(), // url to access the file in storage
    thumbnailUrl: text('thumbnail_url'), // url to access the thumbnail in storage

    // Owner info
    userId: text('user_id').notNull(),
    parentId: uuid('parent_id'), // Parent folder id, null if root

    // file/folder flags
    isFolder: boolean('is_folder').default(false).notNull(),
    isStarred: boolean('is_starred').default(false).notNull(),
    isTrash: boolean('is_trash').default(false).notNull(),

    // timestamps
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),

});

/*
    Relations 
    A file can have many children (if it's a folder)
    A file can have one parent (if it's not root)
*/
export const filesRelations = relations(files, ({ one, many }) => ({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id],
    }),

    children: many(files),
}));



// Type definations
export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;
