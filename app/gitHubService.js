angular.module('gitHubService', ['ngResource']).
        factory('gitHub', [
            '$resource',
            function ($resource) {
                //List for organizations repos
                ///orgs/:org/repos
                //ie: https://api.github.com/:action/:org/:id'
                return $resource('https://api.github.com/:action/angular/:id',
                    {
                        action: '@action',
                        id: '@id',
                        org: '@org'
                    },
                    {
                        getAll: {
                            method: 'GET',
                            isArray: true,
                            params: { action: 'orgs', id: 'repos', org: '@org'}
                        },
                        getDetail: {
                            method: 'GET',
                            params: { action: 'repos' }
                        },
                    });
            }
        ]);