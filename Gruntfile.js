module.exports = function(grunt) {

    // Задачи
    grunt.initConfig({
        // Склеиваем
        concat: {
            js_app: {
                src: [
                    'angular/auctionModule.js',
                    'angular/modules/**.js',
                    'angular/controllers/**.js',
                    'angular/modules/auth/**.js',
                    'angular/modules/userAccount/**.js',
                    // 'angular/admin/modules/**.js',
                    'angular/services/**.js',
                    // 'angular/admin/controllers/**.js',

                                  ],
                dest: 'public/scripts.min.js',
                separator: ';'
            },

            admin_js: {
                src: [
                    'angular/admin/modules/**.js',
                    'angular/admin/services/**.js',
                    'angular/admin/controllers/**.js',
                                  ],
                dest: 'public/adminScripts.min.js',
                separator: ';'
            },
            moduls:{
                src: [
                    'angular/angular.min.js',
                    'angular/angular-route.min.js',
                    'angular/modules/imageupload.js',
                    'node_modules/dist/restangular/release/restangular.min.js',
                    'node_modules/ngstorage/ngStorage.min.js',
                    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
                    'node_modules/angular-animate/angular-animate.min.js',
                    'node_modules/angular-aria/angular-aria.min.js',
                    'node_modules/angular-jk-carousel/dist/jk-carousel.min.js',
                    'node_modules/angular-material/angular-material.min.js',
                    'node_modules/angular-messages/angular-messages.min.js',
                    'node_modules/angular-material-sidemenu/dest/angular-material-sidemenu.js',
                    'angular/sotos.angular-slider.min.js'
                ],
                dest: 'public/modul.min.js',
                separator: ';'
            }
        },

        uglify: {
            main: {
                files: {
                    'public/scripts.min.js' : [
                        'angular/angular.min.js',
                        'angular/angular-route.min.js',
                        'angular/auctionModule.js',
                        'node_modules/dist/restangular/release/restangular.min.js',
                        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
                        'angular/modules/**.js',
                        'angular/modules/auth/**.js',
                        'angular/modules/userAccount/**.js',
                        'angular/admin/modules/**.js',
                        'angular/services/**.js',
                        'angular/controllers/**.js',
                        'angular/admin/controllers/**.js',
                        'node_modules/angular-animate/angular-animate.min.js',
                        'node_modules/angular-aria/angular-aria.min.js',
                        'node_modules/angular-jk-carousel/dist/jk-carousel.min.js',
                        'node_modules/angular-material/angular-material.min.js',
                        'angular/sotos.angular-slider.min.js'
                    ]
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/style.css': 'scss/index.scss',
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'public/style.min.css': [
                        'public/style.css',
                        'node_modules/angular-jk-carousel/dist/jk-carousel.min.css',
                        'node_modules/angular-material/angular-material.min.css',
                        'angular/css/sotos.angular-slider.min.css'
                        // 'angular/css/app.css'
                    ]
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');



    grunt.registerTask('default', [ 'concat' , 'sass','cssmin']);
    grunt.registerTask('build', [ 'concat:js_app' ]);
    grunt.registerTask('js_def', [ 'concat' ]);
};