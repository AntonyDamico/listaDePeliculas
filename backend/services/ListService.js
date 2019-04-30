class ListService {

    static getAll(media, userId) {
        const sql = ListQueryBuilder.buildSelectQuery(media, userId);
        return connection.queryAsync(sql)
            .catch(err => console.log(err.sqlMessage));
    }

    static insert(media, user_id, mediaId) {
        const insertObj = {
            user_id,
            [media + '_id']: mediaId
        };
        return knex(ListQueryBuilder.buildTableName(media))
            .insert(insertObj)
            .catch(err => console.log(err))
    }

    static delete(media, userId, mediaId) {
        const sql = ListQueryBuilder.buildDeleteQuery(media, userId, mediaId);
        return connection.queryAsync(sql)
            .catch(err => console.log(err.sqlMessage));
    }

}


class ListQueryBuilder {

    static buildSelectQuery(media, userId) {
        const fullMediaName = media === 'show' ? 'tv_' + media : media;
        const tableName = ListQueryBuilder.buildTableName(media);
        return `select movie_id, title, language, poster
                        vote_average, release_date from ${fullMediaName} 
                        inner join ${tableName} on 
                        ${tableName}.${media}_id = ${fullMediaName}.id 
                        where user_id = ${userId}`;
    }

    static buildDeleteQuery(media, userId, mediaId) {
        const tableName = ListQueryBuilder.buildTableName(media);
        return `delete from ${tableName} 
                     where user_id = ${userId} and ${media}_id = ${mediaId}`;
    }


    static buildTableName(media) {
        return media + '_watch_list';
    }
}

export default ListService;
