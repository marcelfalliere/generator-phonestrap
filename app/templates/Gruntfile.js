module.exports = function(grunt) {
    grunt.initConfig({
        // running `grunt less` will compile once
        less: {
            development: {
                options: {
                    paths: ["www/styles"],
                    yuicompress: true
                },
            files: {
                "www/styles/transitions.css": "www/styles/transitions.less",
                "www/styles/all.css": "www/styles/all.less"
            }
        }
    },
    // running `grunt watch` will watch for changes
    watch: {
        files: "./css/*.less",
        tasks: ["less"]
    }
});
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
};