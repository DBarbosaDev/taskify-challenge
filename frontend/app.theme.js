(function () {
    angular.module('TaskifyApp').config(ThemeConfigs);

    function ThemeConfigs($mdThemingProvider) {
        $mdThemingProvider.definePalette('blue', {
            default: '500',
            50: '2A265F',
            100: '2A265F',
            200: '2A265F',
            300: '2A265F',
            400: '2A265F',
            500: '2A265F',
            600: '2A265F',
            700: '2A265F',
            800: '2A265F',
            900: '2A265F',
            A100: 'FFFFFF',
            A200: 'FFFFFF',
            A400: 'FFFFFF',
            A700: 'FFFFFF',
            contrastDefaultColor: 'light'
        });

        const greyPaletteMap = $mdThemingProvider.extendPalette('grey', {
            default: '500',
            300: 'DDDDDD',
            500: 'AAA8BF'
        });

        $mdThemingProvider.definePalette('greyPalette', greyPaletteMap);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('greyPalette');
    }
}());
