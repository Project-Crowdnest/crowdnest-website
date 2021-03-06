// Sets up custom urls that require a dynamic slug.
const routes = require('next-routes')();
 
// Order matters!
// The route using a wildcard would override the previous one if it was
// added before.
routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:campaignAddress', '/campaigns/show')
    .add('/campaigns/:campaignAddress/requests', '/campaigns/requests/index')
    .add('/campaigns/:campaignAddress/requests/new', '/campaigns/requests/new');

module.exports = routes;