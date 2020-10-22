"use strict"
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
module.exports = {
    async me(ctx) {
        const user = ctx.state.user
        let imagenes = await strapi.services.imagenes.find({
            user: user.id
        })
        ctx.send(imagenes)
    },
    async create(ctx) {
        let entity;
        const user = ctx.state.user;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            data.user = user.id;
            entity = await strapi.services.imagenes.create(data, { files });
        } else {
            const data = ctx.request.body;
            data.user = user.id;
            entity = await strapi.services.create(data);
        }
        //const user = ctx.state.user
        // const data = await strapi.entityValidator.validateEntity(strapi.models.imagenes, ctx)
        //console.log(data)

        return sanitizeEntity(entity, { model: strapi.models.imagenes });
    }
};