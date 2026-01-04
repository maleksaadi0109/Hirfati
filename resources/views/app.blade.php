<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Critical inline styles to prevent FOUC and layout shift --}}
        <style>
            /* Background colors */
            html {
                background-color: oklch(1 0 0);
            }
            html.dark {
                background-color: oklch(0.145 0 0);
            }

            /* Height inheritance chain - prevents layout shift */
            html, body {
                height: 100%;
                margin: 0;
                padding: 0;
            }

            /* Scrollbar stability - prevents CLS when scrollbar appears/disappears */
            html {
                overflow-y: scroll;
                scrollbar-gutter: stable;
            }

            /* Root app container */
            #app {
                min-height: 100%;
                display: flex;
                flex-direction: column;
            }
        </style>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="{{ asset('images/hirfati-logo.jpg') }}" type="image/jpeg">
        <link rel="apple-touch-icon" href="{{ asset('images/hirfati-logo.jpg') }}">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
