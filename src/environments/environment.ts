// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    // api: 'http://localhost:8000/api',
    // api: 'https://api.oliver-james.ready4s.it/api',
    api: 'https://api.oliver-james.ready4s.it/api',
    admin: 'https://api.oliver-james.ready4s.it/admin',
    site: 'http://localhost:4200',
    stripe_key: "pk_test_sihAGUNVJG3EsvgRyh7IHDQo"
};
