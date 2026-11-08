const ICONS = {"eye":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>","eye-off":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49\"/><path d=\"M14.084 14.158a3 3 0 0 1-4.242-4.242\"/><path d=\"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143\"/><path d=\"m2 2 20 20\"/></svg>","lock":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/></svg>","mail":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\"/><path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\"/></svg>","bell":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10.268 21a2 2 0 0 0 3.464 0\"/><path d=\"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326\"/></svg>","clipboard-check":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"8\" height=\"4\" x=\"8\" y=\"2\" rx=\"1\" ry=\"1\"/><path d=\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\"/><path d=\"m9 14 2 2 4-4\"/></svg>","history":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/><path d=\"M3 3v5h5\"/><path d=\"M12 7v5l4 2\"/></svg>","layout-dashboard":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"7\" height=\"9\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"14\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"9\" x=\"14\" y=\"12\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\"/></svg>","log-out":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><polyline points=\"16 17 21 12 16 7\"/><line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\"/></svg>","message-square":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/></svg>","moon":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\"/></svg>","user-cog":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"18\" cy=\"15\" r=\"3\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M10 15H6a4 4 0 0 0-4 4v2\"/><path d=\"m21.7 16.4-.9-.3\"/><path d=\"m15.2 13.9-.9-.3\"/><path d=\"m16.6 18.7.3-.9\"/><path d=\"m19.1 12.2.3-.9\"/><path d=\"m19.6 18.7-.4-1\"/><path d=\"m16.8 12.3-.4-1\"/><path d=\"m14.3 16.6 1-.4\"/><path d=\"m20.7 13.8 1-.4\"/></svg>","users":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/></svg>","chevron-left":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m15 18-6-6 6-6\"/></svg>","chevron-right":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m9 18 6-6-6-6\"/></svg>","hourglass":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 22h14\"/><path d=\"M5 2h14\"/><path d=\"M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22\"/><path d=\"M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2\"/></svg>","zap":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z\"/></svg>","check":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 6 9 17l-5-5\"/></svg>","ellipsis-vertical":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"1\"/><circle cx=\"12\" cy=\"5\" r=\"1\"/><circle cx=\"12\" cy=\"19\" r=\"1\"/></svg>","clock":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/></svg>","ban":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m4.9 4.9 14.2 14.2\"/></svg>","info":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 16v-4\"/><path d=\"M12 8h.01\"/></svg>","x":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg>","search":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>","sliders-horizontal":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"21\" x2=\"14\" y1=\"4\" y2=\"4\"/><line x1=\"10\" x2=\"3\" y1=\"4\" y2=\"4\"/><line x1=\"21\" x2=\"12\" y1=\"12\" y2=\"12\"/><line x1=\"8\" x2=\"3\" y1=\"12\" y2=\"12\"/><line x1=\"21\" x2=\"16\" y1=\"20\" y2=\"20\"/><line x1=\"12\" x2=\"3\" y1=\"20\" y2=\"20\"/><line x1=\"14\" x2=\"14\" y1=\"2\" y2=\"6\"/><line x1=\"8\" x2=\"8\" y1=\"10\" y2=\"14\"/><line x1=\"16\" x2=\"16\" y1=\"18\" y2=\"22\"/></svg>","arrow-right":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12h14\"/><path d=\"m12 5 7 7-7 7\"/></svg>","calendar-days":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 2v4\"/><path d=\"M16 2v4\"/><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"/><path d=\"M3 10h18\"/><path d=\"M8 14h.01\"/><path d=\"M12 14h.01\"/><path d=\"M16 14h.01\"/><path d=\"M8 18h.01\"/><path d=\"M12 18h.01\"/><path d=\"M16 18h.01\"/></svg>","message-circle":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7.9 20A9 9 0 1 0 4 16.1L2 22Z\"/></svg>","chevron-down":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m6 9 6 6 6-6\"/></svg>","arrow-left":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m12 19-7-7 7-7\"/><path d=\"M19 12H5\"/></svg>","arrow-down":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 5v14\"/><path d=\"m19 12-7 7-7-7\"/></svg>","arrow-up":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m5 12 7-7 7 7\"/><path d=\"M12 19V5\"/></svg>","sparkles":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\"/><path d=\"M20 3v4\"/><path d=\"M22 5h-4\"/><path d=\"M4 17v2\"/><path d=\"M5 18H3\"/></svg>","user-round":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"8\" r=\"5\"/><path d=\"M20 21a8 8 0 0 0-16 0\"/></svg>","camera":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z\"/><circle cx=\"12\" cy=\"13\" r=\"3\"/></svg>","upload":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"17 8 12 3 7 8\"/><line x1=\"12\" x2=\"12\" y1=\"3\" y2=\"15\"/></svg>","plus":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12h14\"/><path d=\"M12 5v14\"/></svg>","sun":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"m4.93 4.93 1.41 1.41\"/><path d=\"m17.66 17.66 1.41 1.41\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/><path d=\"m6.34 17.66-1.41 1.41\"/><path d=\"m19.07 4.93-1.41 1.41\"/></svg>","key-round":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z\"/><circle cx=\"16.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/></svg>","rotate-cw":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8\"/><path d=\"M21 3v5h-5\"/></svg>","save":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z\"/><path d=\"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7\"/><path d=\"M7 3v4a1 1 0 0 0 1 1h7\"/></svg>","map-pin":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/></svg>","user":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\"/><circle cx=\"12\" cy=\"7\" r=\"4\"/></svg>","bold":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8\"/></svg>","italic":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"19\" x2=\"10\" y1=\"4\" y2=\"4\"/><line x1=\"14\" x2=\"5\" y1=\"20\" y2=\"20\"/><line x1=\"15\" x2=\"9\" y1=\"4\" y2=\"20\"/></svg>","list":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 12h.01\"/><path d=\"M3 18h.01\"/><path d=\"M3 6h.01\"/><path d=\"M8 12h13\"/><path d=\"M8 18h13\"/><path d=\"M8 6h13\"/></svg>","list-ordered":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 12h11\"/><path d=\"M10 18h11\"/><path d=\"M10 6h11\"/><path d=\"M4 10h2\"/><path d=\"M4 6h1v4\"/><path d=\"M6 18H4c0-1 2-2 2-3s-1-1.5-2-1\"/></svg>","code":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"16 18 22 12 16 6\"/><polyline points=\"8 6 2 12 8 18\"/></svg>","smile":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M8 14s1.5 2 4 2 4-2 4-2\"/><line x1=\"9\" x2=\"9.01\" y1=\"9\" y2=\"9\"/><line x1=\"15\" x2=\"15.01\" y1=\"9\" y2=\"9\"/></svg>","dumbbell":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14.4 14.4 9.6 9.6\"/><path d=\"M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z\"/><path d=\"m21.5 21.5-1.4-1.4\"/><path d=\"M3.9 3.9 2.5 2.5\"/><path d=\"M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z\"/></svg>","salad":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7 21h10\"/><path d=\"M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z\"/><path d=\"M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1\"/><path d=\"m13 12 4-4\"/><path d=\"M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2\"/></svg>","chart-line":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 3v16a2 2 0 0 0 2 2h16\"/><path d=\"m19 9-5 5-4-4-3 3\"/></svg>"};

const C = {
  primary: "#7DC04E",
  brand: "#F69665",
  sidebar: "#2C303A",
  white: "#FFFFFF",
  ink: "#181B25",
  inkSoft: "#464555",
  muted: "#777587",
  outline: "#C7C4D8",
  tint: "#F1F3FF",
  alt: "#F9F9FF",
  s2: "#EBEDFB",
  s3: "#E5E8F5",
  s4: "#DFE2EF",
  success: "#006C47",
  successContainer: "#82F9BE",
  successDeep: "#002113",
  danger: "#FF6C6C",
  dangerStrong: "#BA1A1A",
  dangerContainer: "#FFDAD6",
  secondaryStrong: "#C34E31",
  accentIndigo: "#493EE5",
  warning: "#F59E0B",
};

const SCREEN_W = 1728;
const SIDEBAR_W = 256;
const HEADER_H = 64;

let FAMILY = "Plus Jakarta Sans";
const PJS = { 400: "Regular", 500: "Medium", 600: "SemiBold", 700: "Bold", 800: "ExtraBold" };
const INTER = { 400: "Regular", 500: "Medium", 600: "Semi Bold", 700: "Bold", 800: "Extra Bold" };
let STYLES = PJS;
let USED_FALLBACK = false;

async function loadFonts() {
  try {
    for (const w of [400, 500, 600, 700, 800]) await figma.loadFontAsync({ family: FAMILY, style: PJS[w] });
  } catch (e) {
    FAMILY = "Inter";
    STYLES = INTER;
    USED_FALLBACK = true;
    for (const w of [400, 500, 600, 700, 800]) await figma.loadFontAsync({ family: FAMILY, style: INTER[w] });
  }
}

function rgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
    a: 1,
  };
}
function solid(hex, opacity) {
  const p = { type: "SOLID", color: rgb(hex) };
  if (opacity != null) p.opacity = opacity;
  return p;
}
function gradient(hexes) {
  return {
    type: "GRADIENT_LINEAR",
    gradientTransform: [[0, 1, 0], [1, 0, 0]],
    gradientStops: hexes.map((hex, i) => ({ position: hexes.length === 1 ? 0 : i / (hexes.length - 1), color: rgb(hex) })),
  };
}

function box(name, w, h, o) {
  o = o || {};
  const f = figma.createFrame();
  f.name = name;
  f.clipsContent = true;
  if (o.fill) f.fills = [solid(o.fill, o.opacity)];
  else if (o.gradient) f.fills = [gradient(o.gradient)];
  else f.fills = [];
  if (o.radius != null) f.cornerRadius = o.radius;
  if (o.dir) {
    f.layoutMode = o.dir;
    f.itemSpacing = o.gap || 0;
    f.paddingTop = o.padT != null ? o.padT : o.pad != null ? o.pad : 0;
    f.paddingRight = o.padR != null ? o.padR : o.pad != null ? o.pad : 0;
    f.paddingBottom = o.padB != null ? o.padB : o.pad != null ? o.pad : 0;
    f.paddingLeft = o.padL != null ? o.padL : o.pad != null ? o.pad : 0;
    f.counterAxisAlignItems = o.align || "MIN";
    if (o.justify) f.primaryAxisAlignItems = o.justify;
  }
  if (w != null || h != null) f.resize(w != null ? w : f.width, h != null ? h : f.height);
  if (o.dir) {
    const horizontal = o.dir === "HORIZONTAL";
    if (horizontal) {
      f.primaryAxisSizingMode = w != null ? "FIXED" : "AUTO";
      f.counterAxisSizingMode = h != null ? "FIXED" : "AUTO";
    } else {
      f.counterAxisSizingMode = w != null ? "FIXED" : "AUTO";
      f.primaryAxisSizingMode = h != null ? "FIXED" : "AUTO";
    }
  }
  if (o.stroke) {
    f.strokes = [solid(o.stroke, o.strokeOpacity)];
    f.strokeWeight = o.strokeWeight || 1;
    f.strokeAlign = "INSIDE";
    if (o.strokeSides === "bottom") {
      f.strokeTopWeight = 0;
      f.strokeLeftWeight = 0;
      f.strokeRightWeight = 0;
      f.strokeBottomWeight = o.strokeWeight || 1;
    }
  }
  return f;
}

function txt(chars, o) {
  o = o || {};
  const t = figma.createText();
  t.fontName = { family: FAMILY, style: STYLES[o.weight || 400] };
  t.characters = chars;
  t.fontSize = o.size || 14;
  t.fills = [solid(o.color || C.ink, o.opacity)];
  if (o.lh != null) t.lineHeight = { unit: "PIXELS", value: o.lh };
  if (o.ls != null) t.letterSpacing = { unit: "PIXELS", value: o.ls };
  if (o.align) t.textAlignHorizontal = o.align;
  if (o.upper) t.textCase = "UPPER";
  if (o.width != null) {
    t.textAutoResize = "HEIGHT";
    t.resize(o.width, t.height);
  }
  return t;
}

function icon(name, size, color) {
  const svg = (ICONS[name] || "")
    .replace(/currentColor/g, color)
    .replace('width="24" height="24"', 'width="' + size + '" height="' + size + '"');
  const n = figma.createNodeFromSvg(svg);
  n.name = "icon/" + name;
  n.fills = [];
  return n;
}

const PENDING = new WeakMap();
function mark(child, key) {
  const p = PENDING.get(child) || {};
  p[key] = true;
  PENDING.set(child, p);
  return child;
}
function add(parent, child) {
  parent.appendChild(child);
  const p = PENDING.get(child);
  if (p) {
    if (p.fillW) {
      try { child.layoutSizingHorizontal = "FILL"; } catch (e) {}
    }
    if (p.fillH) {
      try { child.layoutSizingVertical = "FILL"; } catch (e) {}
    }
  }
  return child;
}
function grow(child) {
  return mark(child, "fillW");
}
function stretch(child) {
  return mark(child, "fillW");
}
function fillV(child) {
  return mark(child, "fillH");
}

function initials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((s) => s[0].toUpperCase()).join("");
}

function avatar(name, size, shape) {
  const f = box("avatar/" + name, size, size, {
    fill: C.s2,
    radius: shape === "circle" ? size / 2 : 16,
    dir: "VERTICAL",
    align: "CENTER",
    justify: "CENTER",
  });
  add(f, txt(initials(name), { size: Math.max(11, Math.round(size * 0.3)), weight: 600, color: C.inkSoft }));
  return f;
}

function avatarDotted(name, size) {
  const wrap = box("avatar-dot/" + name, size, size, {});
  add(wrap, avatar(name, size, "circle"));
  const dot = figma.createEllipse();
  dot.resize(size * 0.25, size * 0.25);
  dot.fills = [solid(C.success)];
  dot.strokes = [solid(C.white)];
  dot.strokeWeight = 2;
  wrap.appendChild(dot);
  dot.x = size - size * 0.25;
  dot.y = size - size * 0.25;
  return wrap;
}

function pill(label, o) {
  o = o || {};
  const f = box("pill/" + label, null, o.h || 22, {
    dir: "HORIZONTAL",
    gap: o.gap != null ? o.gap : 4,
    padL: o.padL != null ? o.padL : 10,
    padR: o.padR != null ? o.padR : 10,
    align: "CENTER",
    justify: o.justify,
    radius: o.radius != null ? o.radius : 9999,
    fill: o.fill,
    opacity: o.opacity,
  });
  if (o.icon) add(f, o.icon);
  add(f, txt(label, { size: o.size || 11, weight: o.weight || 600, color: o.color || C.inkSoft, ls: o.ls }));
  return f;
}

function button(label, o) {
  o = o || {};
  const f = box("button/" + label, o.w != null ? o.w : null, o.h || 40, {
    dir: "HORIZONTAL",
    gap: 8,
    padL: o.padX != null ? o.padX : 20,
    padR: o.padX != null ? o.padX : 20,
    align: "CENTER",
    justify: "CENTER",
    radius: o.radius != null ? o.radius : 8,
    fill: o.fill,
  });
  if (o.icon) add(f, o.icon);
  if (label) add(f, txt(label, { size: o.size || 14, weight: o.weight || 600, color: o.color || C.ink }));
  return f;
}

function chip(label, active) {
  return pill(label, {
    h: 28,
    padL: 12,
    padR: 12,
    radius: 9999,
    size: 12,
    weight: 500,
    ls: 0.24,
    fill: active ? C.brand : C.tint,
    color: active ? C.white : C.inkSoft,
  });
}

function segmented(labels, active, variant) {
  const wrap = box("segmented", null, 36, { dir: "HORIZONTAL", gap: 4, pad: 4, align: "CENTER", radius: 9999, fill: C.tint });
  labels.forEach((label, i) => {
    const on = i === active;
    const f = box("seg", null, 28, {
      dir: "HORIZONTAL",
      padL: 16,
      padR: 16,
      align: "CENTER",
      radius: 9999,
      fill: on ? (variant === "brand" ? C.brand : C.white) : null,
    });
    add(f, txt(label, { size: 12, weight: 500, color: on ? (variant === "brand" ? C.white : C.ink) : C.inkSoft, ls: 0.24 }));
    add(wrap, f);
  });
  return wrap;
}

function overline(t, color) {
  return txt(t, { size: 10, weight: 700, color: color || C.muted, ls: 0.5, upper: true });
}

function emptyState(iconName, title, desc) {
  const f = box("empty-state", null, null, { dir: "VERTICAL", gap: 12, align: "CENTER", padT: 64, padB: 64 });
  add(f, icon(iconName, 48, C.ink));
  add(f, txt(title, { size: 20, weight: 600, color: C.ink }));
  add(f, txt(desc, { size: 14, weight: 400, color: C.inkSoft, align: "CENTER", width: 420 }));
  return f;
}

function badgeTujuan(tujuan) {
  if (tujuan === "turun_bb") return pill("Turun BB", { fill: C.dangerContainer, color: C.dangerStrong, size: 11, h: 20, padL: 10, padR: 10 });
  if (tujuan === "naik_bb") return pill("Naik BB", { fill: C.successContainer, color: C.success, opacity: 0.4, size: 11, h: 20, padL: 10, padR: 10 });
  return pill("-", { fill: C.s3, color: C.muted, size: 11, h: 20, padL: 10, padR: 10 });
}

function badgeGoal(goal) {
  if (goal === "weight_loss") return pill("Turun BB", { fill: C.dangerContainer, color: C.dangerStrong, size: 11, h: 20, padL: 10, padR: 10 });
  return pill("Naik BB", { fill: C.successContainer, color: C.success, opacity: 0.4, size: 11, h: 20, padL: 10, padR: 10 });
}

function badgeDelta(down, label) {
  return pill(label, { fill: down ? C.dangerContainer : C.successContainer, color: down ? C.dangerStrong : C.success, size: 12, h: 24, padL: 10, padR: 10, gap: 2 });
}

function sidebar(active, height) {
  const s = box("aside", SIDEBAR_W, height, { dir: "VERTICAL", pad: 16, fill: C.sidebar });
  const brand = box("brand", null, null, { dir: "VERTICAL", gap: 2, padT: 8, padB: 24, padL: 12, padR: 12 });
  add(brand, txt("Bugarin", { size: 18, weight: 700, color: C.white, ls: -0.45 }));
  add(brand, txt("PT Platform", { size: 10, weight: 600, color: C.primary, ls: 0.5, upper: true }));
  add(s, stretch(brand));

  const nav = box("nav", null, null, { dir: "VERTICAL", gap: 4 });
  const items = [
    ["Dashboard", "layout-dashboard", "dashboard"],
    ["Verifikasi", "clipboard-check", "verifikasi"],
    ["Klien", "users", "klien"],
    ["Riwayat", "history", "riwayat"],
    ["Feedback", "message-square", "feedback"],
    ["Profil", "user-cog", "profil"],
  ];
  for (const [label, ico, key] of items) {
    const isActive = key === active;
    const item = box("nav/" + label, null, 36, {
      dir: "HORIZONTAL",
      gap: 12,
      padL: 12,
      padR: 12,
      align: "CENTER",
      radius: 8,
      fill: isActive ? C.primary : null,
    });
    add(item, icon(ico, 20, C.white));
    if (!isActive) item.children[0].opacity = 0.7;
    add(item, grow(txt(label, { size: 14, weight: 500, color: C.white, opacity: isActive ? 1 : 0.7 })));
    if (key === "verifikasi") add(item, pill("3", { fill: C.danger, color: C.white, padL: 6, padR: 6, h: 18, size: 10, weight: 600 }));
    add(nav, stretch(item));
  }
  add(s, stretch(nav));
  add(s, fillV(box("spacer", null, 0, { dir: "VERTICAL" })));

  const user = box("user-card", null, null, { dir: "HORIZONTAL", gap: 12, pad: 12, align: "CENTER", radius: 12, fill: C.white, opacity: 0.1 });
  add(user, avatar("Alex Vance", 40, "circle"));
  const ucol = box("user-col", null, null, { dir: "VERTICAL", gap: 2 });
  add(ucol, txt("Alex Vance", { size: 14, weight: 600, color: C.white }));
  add(ucol, txt("Performance Coach", { size: 12, weight: 400, color: C.white, opacity: 0.5 }));
  add(user, grow(ucol));
  add(s, stretch(user));

  const exit = box("exit", null, null, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, padT: 12, align: "CENTER" });
  add(exit, icon("log-out", 16, C.danger));
  add(exit, txt("Exit", { size: 12, weight: 500, color: C.danger }));
  add(s, stretch(exit));
  return s;
}

function headerBar() {
  const h = box("header", SCREEN_W - SIDEBAR_W, HEADER_H, {
    dir: "HORIZONTAL",
    gap: 16,
    padL: 24,
    padR: 24,
    align: "CENTER",
    justify: "MAX",
    fill: C.white,
    stroke: C.s4,
    strokeWeight: 1,
    strokeSides: "bottom",
  });
  add(h, icon("moon", 20, C.inkSoft));
  const bellWrap = box("bell", 24, 24, {});
  bellWrap.appendChild(icon("bell", 20, C.inkSoft));
  const dot = figma.createEllipse();
  dot.resize(8, 8);
  dot.fills = [solid(C.danger)];
  bellWrap.appendChild(dot);
  dot.x = 16;
  dot.y = 0;
  add(h, bellWrap);
  add(h, avatar("Alex Vance", 32, "circle"));
  return h;
}

function ptScreen(name, active, height, build) {
  const root = box(name, SCREEN_W, height, { dir: "HORIZONTAL" });
  add(root, sidebar(active, height));
  const main = box("main-col", SCREEN_W - SIDEBAR_W, height, { dir: "VERTICAL", fill: C.tint });
  add(main, headerBar());
  const content = box("content", SCREEN_W - SIDEBAR_W, null, { dir: "VERTICAL", gap: 24, pad: 24, fill: C.tint });
  add(main, fillV(stretch(content)));
  add(root, main);
  build(content);
  return root;
}

function pageHeader(title, description, badge) {
  const wrap = box("page-header", null, null, { dir: "HORIZONTAL", align: "MIN", justify: "SPACE_BETWEEN", gap: 16 });
  const left = box("ph-left", null, null, { dir: "VERTICAL", gap: 4 });
  const titleRow = box("ph-title", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER" });
  add(titleRow, txt(title, { size: 40, weight: 800, color: C.ink, ls: -0.7 }));
  if (badge) add(titleRow, badge);
  add(left, titleRow);
  if (description) add(left, txt(description, { size: 20, weight: 400, color: C.inkSoft, width: 1271 }));
  add(wrap, left);
  return wrap;
}

function statCard(iconName, label, value) {
  const card = box("stat-card", null, null, { dir: "VERTICAL", pad: 24, radius: 12, fill: C.white });
  const ico = box("stat-icon", 40, 40, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 8, fill: C.brand });
  add(ico, icon(iconName, 20, C.white));
  add(card, ico);
  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  add(card, txt(label, { size: 11, weight: 600, color: C.muted, ls: 0.6, upper: true }));
  add(card, txt(String(value), { size: 36, weight: 700, color: C.ink }));
  return card;
}

function sessionRow(j) {
  const row = box("session", null, null, { dir: "HORIZONTAL", gap: 16, pad: 16, align: "CENTER", radius: 12, fill: C.tint });
  const timeBox = box("time", 80, 48, { dir: "VERTICAL", gap: 2, align: "CENTER", justify: "CENTER", radius: 8, fill: C.s3 });
  add(timeBox, txt(j.hari, { size: 9, weight: 600, color: C.ink, ls: 0.4, upper: true }));
  add(timeBox, txt(j.jam, { size: 14, weight: 700, color: C.ink }));
  add(row, timeBox);
  add(row, avatar(j.namaKlien, 40, "circle"));
  const col = box("info", null, null, { dir: "VERTICAL", gap: 2 });
  add(col, txt(j.namaKlien, { size: 16, weight: 600, color: C.ink }));
  add(col, txt(j.jenis, { size: 12, weight: 400, color: C.muted }));
  add(row, grow(col));
  const loc = box("loc", null, null, { dir: "HORIZONTAL", gap: 4, align: "CENTER" });
  add(loc, icon("map-pin", 14, C.muted));
  add(loc, txt(j.lokasi, { size: 12, weight: 400, color: C.muted }));
  add(row, loc);
  return row;
}

function buildDashboard(content) {
  const banner = box("greeting-banner", null, null, { dir: "VERTICAL", gap: 6, pad: 24, radius: 12, fill: C.primary });
  add(banner, txt("Selamat pagi, Coach Alex!", { size: 40, weight: 700, color: C.white, lh: 44 }));
  add(banner, txt("Jadwal hasil AI disinkronkan otomatis dengan data biometrik klien.", { size: 14, weight: 400, color: C.white, opacity: 0.9 }));
  add(content, stretch(banner));

  const stats = box("stats", null, null, { dir: "HORIZONTAL", gap: 20 });
  add(stats, grow(statCard("users", "Total Klien Aktif", 24)));
  add(stats, grow(statCard("clipboard-check", "Menunggu Verifikasi", 3)));
  add(content, stretch(stats));

  const card = box("schedule-card", null, null, { dir: "VERTICAL", gap: 0, pad: 24, radius: 12, fill: C.white });
  const titleRow = box("schedule-title", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER" });
  add(titleRow, txt("Jadwal Latihan Minggu Ini", { size: 20, weight: 600, color: C.ink }));
  const ai = box("badge-ai", null, 20, { dir: "HORIZONTAL", gap: 4, padL: 8, padR: 8, align: "CENTER", radius: 9999, fill: C.brand, opacity: 0.1 });
  add(ai, icon("zap", 12, C.secondaryStrong));
  add(ai, txt("Direncanakan AI", { size: 12, weight: 500, color: C.secondaryStrong }));
  add(titleRow, ai);
  add(card, stretch(titleRow));
  add(card, txt("Gabungan jadwal seluruh klien dari weekly plan yang telah disetujui.", { size: 12, weight: 400, color: C.muted }));
  add(card, box("gap", null, 24, { dir: "VERTICAL" }));

  const sessions = box("sessions", null, null, { dir: "VERTICAL", gap: 8 });
  const data = [
    { namaKlien: "Marcus Sterling", hari: "Sen", jam: "09:30", jenis: "Push Day", lokasi: "pusatgym" },
    { namaKlien: "Sarah Jenkins", hari: "Sel", jam: "11:00", jenis: "HIIT Cardio", lokasi: "pusatgym" },
    { namaKlien: "David Kim", hari: "Rab", jam: "14:00", jenis: "Upper Body", lokasi: "pusatgym" },
    { namaKlien: "Elena Rostova", hari: "Kam", jam: "17:30", jenis: "Leg Day", lokasi: "pusatgym" },
  ];
  for (const j of data) add(sessions, stretch(sessionRow(j)));
  add(card, stretch(sessions));
  add(content, stretch(card));
}

function buildVerifikasi(content) {
  add(content, stretch(pageHeader("Antrian Pendaftaran Klien", "Tinjau penilaian awal calon klien serta tujuan atletik yang menunggu persetujuan atau penolakan sebelum penyusunan jadwal periodisasi.")));

  const toolbar = box("toolbar", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER" });
  const search = box("search", null, 40, { dir: "HORIZONTAL", gap: 8, padL: 16, padR: 16, align: "CENTER", radius: 9999, fill: C.tint });
  add(search, icon("search", 16, C.muted));
  add(search, txt("Cari pendaftar berdasarkan nama...", { size: 14, weight: 400, color: C.muted }));
  grow(search);
  add(toolbar, search);
  add(toolbar, chip("Semua Menunggu (3)", true));
  add(content, stretch(toolbar));

  const list = box("list", null, null, { dir: "VERTICAL", gap: 0 });
  const data = [
    { nama: "Rachel Cooper", diajukan: "5/10/2026", tujuan: "naik_bb" },
    { nama: "Andi Saputra", diajukan: "5/10/2026", tujuan: "turun_bb" },
    { nama: "Candra Wijaya", diajukan: "4/10/2026", tujuan: "naik_bb" },
  ];
  for (const r of data) add(list, stretch(verifikasiCard(r)));
  add(content, stretch(list));
}

function verifikasiCard(r) {
  const card = box("verifikasi-card", null, null, { dir: "VERTICAL", gap: 0, pad: 24, radius: 16, fill: C.white });
  const head = box("head", null, null, { dir: "HORIZONTAL", gap: 16, align: "MIN" });
  add(head, avatarDotted(r.nama, 48));
  const info = box("info", null, null, { dir: "VERTICAL", gap: 4 });
  add(info, txt(r.nama, { size: 18, weight: 700, color: C.ink }));
  const meta = box("meta", null, null, { dir: "HORIZONTAL", gap: 6, align: "CENTER" });
  add(meta, icon("clock", 14, C.muted));
  add(meta, txt("Diajukan: " + r.diajukan, { size: 12, weight: 400, color: C.muted }));
  add(info, meta);
  add(head, grow(info));
  add(head, badgeTujuan(r.tujuan));
  add(card, stretch(head));

  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  const actions = box("actions", null, null, { dir: "HORIZONTAL", gap: 12 });
  add(actions, button("Tolak", { icon: icon("x", 16, C.dangerStrong), fill: C.dangerContainer, color: C.dangerStrong, radius: 9999, padX: 16, h: 40 }));
  add(actions, button("Terima Klien", { icon: icon("check", 16, C.white), fill: C.success, color: C.white, radius: 9999, padX: 16, h: 40 }));
  add(card, stretch(actions));
  return card;
}

const KLIEN = [
  { nama: "Marcus Sterling", tujuan: "naik_bb", durasiHari: 56 },
  { nama: "Sarah Jenkins", tujuan: "turun_bb", durasiHari: 42 },
  { nama: "Elena Rostova", tujuan: "naik_bb", durasiHari: 30 },
  { nama: "David Kim", tujuan: "turun_bb", durasiHari: 21 },
  { nama: "Chloe Bennett", tujuan: "turun_bb", durasiHari: 14 },
  { nama: "Jordan Hayes", tujuan: "naik_bb", durasiHari: 7 },
];

function buildKlien(content) {
  add(content, stretch(pageHeader("Klien Aktif", null, pill("6 Terpantau", { fill: C.s3, color: C.inkSoft, padL: 10, padR: 10, size: 11, h: 18 }))));

  const bar = box("filter-bar", null, null, { dir: "HORIZONTAL", gap: 16, pad: 16, align: "CENTER", justify: "SPACE_BETWEEN", radius: 16, fill: C.white });
  const search = box("search", 576, 40, { dir: "HORIZONTAL", gap: 8, padL: 16, padR: 16, align: "CENTER", radius: 9999, fill: C.tint });
  add(search, icon("search", 16, C.muted));
  add(search, txt("Cari klien berdasarkan nama...", { size: 14, weight: 400, color: C.muted }));
  add(bar, search);
  const chips = box("chips", null, null, { dir: "HORIZONTAL", gap: 4, align: "CENTER" });
  add(chips, chip("Semua (6)", true));
  add(chips, chip("Naik BB", false));
  add(chips, chip("Turun BB", false));
  add(bar, chips);
  add(content, stretch(bar));

  const grid = box("grid", null, null, { dir: "VERTICAL", gap: 24 });
  for (let i = 0; i < KLIEN.length; i += 3) {
    const row = box("row", null, null, { dir: "HORIZONTAL", gap: 24 });
    for (const k of KLIEN.slice(i, i + 3)) add(row, grow(klienCard(k)));
    add(grid, stretch(row));
  }
  add(content, stretch(grid));
}

function klienCard(k) {
  const card = box("klien-card", null, null, { dir: "VERTICAL", gap: 0, pad: 24, radius: 16, fill: C.white });
  const top = box("top", null, null, { dir: "HORIZONTAL", align: "MIN", justify: "SPACE_BETWEEN" });
  const left = box("identity", null, null, { dir: "HORIZONTAL", gap: 16, align: "CENTER" });
  add(left, avatar(k.nama, 56, "square"));
  const col = box("name-col", null, null, { dir: "VERTICAL", gap: 0 });
  add(col, txt(k.nama, { size: 18, weight: 800, color: C.ink }));
  if (k.durasiHari != null) add(col, txt(k.durasiHari + " Hari", { size: 12, weight: 400, color: C.muted }));
  add(left, col);
  add(top, left);
  add(top, icon("message-circle", 16, C.inkSoft));
  add(card, stretch(top));

  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  add(card, badgeTujuan(k.tujuan));

  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  const link = box("footer-link", null, 40, { dir: "HORIZONTAL", gap: 4, align: "CENTER", justify: "CENTER", radius: 12, fill: C.brand });
  add(link, txt("Lihat Profil & Program Lengkap", { size: 14, weight: 700, color: C.white }));
  add(link, icon("arrow-right", 14, C.white));
  add(card, stretch(link));
  return card;
}

function buildFeedback(content) {
  add(content, stretch(pageHeader("Pusat Feedback", "Evaluasi biometrik real-time, tinjauan analisis video, dan pengiriman arahan bimbingan.")));

  const grid = box("feedback-grid", null, null, { dir: "HORIZONTAL", gap: 24 });
  add(grid, feedbackClients(0));
  const right = box("detail-col", null, null, { dir: "VERTICAL", gap: 24 });
  add(right, athleteCard(KLIEN[0]));
  add(right, composerCard());
  add(grid, grow(right));
  add(content, stretch(grid));
}

function buildFeedbackEmpty(content) {
  add(content, stretch(pageHeader("Pusat Feedback", "Evaluasi biometrik real-time, tinjauan analisis video, dan pengiriman arahan bimbingan.")));

  const grid = box("feedback-grid", null, null, { dir: "HORIZONTAL", gap: 24 });
  add(grid, feedbackClients(-1));
  const right = box("detail-col", null, null, { dir: "VERTICAL" });
  add(right, emptyState("message-square", "Pilih klien", "Pilih klien di sebelah kiri untuk mulai menulis feedback."));
  add(grid, grow(right));
  add(content, stretch(grid));
}

function feedbackClients(activeIndex) {
  const left = box("client-col", 442, null, { dir: "VERTICAL", gap: 4 });
  KLIEN.forEach((k, i) => {
    const active = i === activeIndex;
    const item = box("client", null, null, { dir: "HORIZONTAL", gap: 12, pad: 16, align: "CENTER", radius: 12, fill: C.white });
    if (active) add(item, box("strip", 4, 56, { radius: 9999, fill: C.primary }));
    add(item, avatar(k.nama, 48, "circle"));
    add(item, grow(txt(k.nama, { size: 18, weight: 600, color: C.ink })));
    add(left, stretch(item));
  });
  return left;
}

function athleteCard(k) {
  const card = box("athlete-card", null, null, { dir: "HORIZONTAL", gap: 16, pad: 24, radius: 16, fill: C.white, align: "CENTER" });
  add(card, avatar(k.nama, 64, "square"));
  const col = box("athlete-info", null, null, { dir: "VERTICAL", gap: 4 });
  add(col, txt(k.nama, { size: 22, weight: 700, color: C.ink, ls: -0.33 }));
  const row = box("athlete-meta", null, null, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
  if (k.durasiHari != null) {
    add(row, txt(k.durasiHari + " Hari", { size: 12, weight: 500, color: C.muted }));
    add(row, txt("•", { size: 12, weight: 400, color: C.muted }));
  }
  add(row, txt("Target:", { size: 12, weight: 500, color: C.muted }));
  add(row, badgeTujuan(k.tujuan));
  add(col, row);
  add(card, col);
  return card;
}

function composerCard() {
  const card = box("composer", null, null, { dir: "VERTICAL", gap: 0, pad: 24, radius: 16, fill: C.white });
  add(card, txt("Pengiriman Protokol Bimbingan", { size: 18, weight: 600, color: C.ink }));
  add(card, overline("Susun arahan, koreksi teknik, dan penyesuaian nutrisi."));
  add(card, box("gap", null, 16, { dir: "VERTICAL" }));

  const wrap = box("composer-box", null, null, { dir: "VERTICAL", gap: 4, pad: 6, radius: 12, fill: C.tint });
  const toolbar = box("toolbar", null, 35, { dir: "HORIZONTAL", gap: 4, padL: 8, padR: 8, align: "CENTER", radius: 8, fill: C.white });
  ["bold", "italic", "list", "list-ordered", "code", "smile"].forEach((name, i) => {
    if (i === 4) add(toolbar, box("divider", 1, 16, { fill: C.outline, opacity: 0.5 }));
    add(toolbar, icon(name, 16, C.inkSoft));
  });
  add(wrap, stretch(toolbar));
  const ta = box("textarea", null, 160, { dir: "VERTICAL", pad: 12, radius: 8, fill: C.white });
  add(ta, txt("Tulis feedback untuk klien... (min. 5 karakter)", { size: 14, weight: 400, color: C.muted }));
  add(wrap, stretch(ta));
  add(card, stretch(wrap));

  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  const actions = box("composer-actions", null, null, { dir: "HORIZONTAL", gap: 8, justify: "MAX" });
  add(actions, button("Batalkan", { fill: C.s2, color: C.ink, radius: 10, padX: 20, h: 40 }));
  add(actions, button("Kirim Feedback", { fill: C.brand, color: C.white, radius: 10, padX: 20, h: 40 }));
  add(card, stretch(actions));
  return card;
}

function buildRiwayat(content) {
  add(content, stretch(pageHeader("Progres & Biometrik Klien", null, pill("6 Terpantau", { fill: C.s3, color: C.inkSoft, padL: 10, padR: 10, size: 11, h: 18 }))));

  const toolbar = box("riwayat-toolbar", null, null, { dir: "HORIZONTAL", pad: 16, align: "CENTER", justify: "SPACE_BETWEEN", radius: 12, fill: C.white });
  add(toolbar, segmented(["Semua", "Naik BB", "Turun BB"], 0, "brand"));
  add(toolbar, segmented(["Semua", "Perempuan", "Laki-laki"], 0, "white"));
  add(content, stretch(toolbar));

  const card = box("matrix-card", null, null, { dir: "VERTICAL", radius: 12, fill: C.white });
  const titleWrap = box("matrix-title", null, null, { dir: "VERTICAL", pad: 16 });
  add(titleWrap, txt("Matriks Progres Atletik", { size: 18, weight: 600, color: C.ink }));
  add(card, stretch(titleWrap));

  const cols = [320, 180, 160, 220, 0];
  const header = box("thead", null, 38, { dir: "HORIZONTAL", fill: C.white, stroke: C.s4, strokeWeight: 1, strokeSides: "bottom" });
  const heads = ["Profil Klien", "Target", "BB Awal", "BB Sekarang", "Selisih"];
  heads.forEach((t, i) => {
    const cell = box("th", cols[i] === 0 ? null : cols[i], 38, { dir: "HORIZONTAL", padL: 16, padR: 16, align: "CENTER" });
    add(cell, overline(t));
    add(header, cols[i] === 0 ? grow(cell) : cell);
  });
  add(card, stretch(header));

  const rows = [
    { nama: "Sarah Jenkins", usia: 29, goal: "weight_loss", bbAwal: "78.5 kg", bbSekarang: "71.2 kg", delta: "-7.3 kg", down: true },
    { nama: "Marcus Sterling", usia: 34, goal: "hypertrophy", bbAwal: "82.0 kg", bbSekarang: "86.8 kg", delta: "+4.8 kg", down: false },
    { nama: "Elena Rostova", usia: 26, goal: "hypertrophy", bbAwal: "59.8 kg", bbSekarang: "63.2 kg", delta: "+3.4 kg", down: false },
    { nama: "David Kim", usia: 31, goal: "weight_loss", bbAwal: "75.0 kg", bbSekarang: "73.9 kg", delta: "-1.1 kg", down: true },
    { nama: "Chloe Bennett", usia: 27, goal: "weight_loss", bbAwal: "69.0 kg", bbSekarang: "63.1 kg", delta: "-5.9 kg", down: true },
    { nama: "Jordan Hayes", usia: 30, goal: "hypertrophy", bbAwal: "77.4 kg", bbSekarang: "80.2 kg", delta: "+2.8 kg", down: false },
  ];
  for (const r of rows) {
    const tr = box("tr", null, null, { dir: "HORIZONTAL", stroke: C.s4, strokeWeight: 1, strokeSides: "bottom" });
    const c0 = box("td", cols[0], null, { dir: "HORIZONTAL", gap: 8, padL: 16, padR: 16, padT: 12, padB: 12, align: "CENTER" });
    add(c0, avatarDotted(r.nama, 40));
    const nm = box("nm", null, null, { dir: "VERTICAL", gap: 0 });
    add(nm, txt(r.nama, { size: 14, weight: 700, color: C.ink }));
    add(nm, overline("Usia " + r.usia));
    add(c0, nm);
    add(tr, c0);
    const c1 = box("td", cols[1], null, { dir: "HORIZONTAL", padL: 16, padR: 16, align: "CENTER" });
    add(c1, badgeGoal(r.goal));
    add(tr, c1);
    add(tr, cellText(cols[2], r.bbAwal, 600));
    add(tr, cellText(cols[3], r.bbSekarang, 700));
    const c4 = box("td", null, null, { dir: "HORIZONTAL", padL: 16, padR: 16, align: "CENTER" });
    add(c4, badgeDelta(r.down, r.delta));
    add(tr, grow(c4));
    add(card, stretch(tr));
  }
  add(content, stretch(card));
}

function cellText(w, t, weight) {
  const c = box("td", w, null, { dir: "HORIZONTAL", padL: 16, padR: 16, align: "CENTER" });
  add(c, txt(t, { size: 12, weight, color: C.ink }));
  return c;
}

function buildProfil(content) {
  add(content, stretch(pageHeader("Pengaturan Profil Pelatih", "Kelola profil bimbingan publik, kredensial, dan parameter autentikasi terenkripsi.")));

  const grid = box("profil-grid", null, null, { dir: "HORIZONTAL", gap: 24 });
  add(grid, profileIdentity());
  const right = box("profil-right", null, null, { dir: "VERTICAL", gap: 24 });
  add(right, personalInfoCard());
  add(right, preferencesCard());
  add(grid, grow(right));
  add(content, stretch(grid));
}

function profileIdentity() {
  const card = box("identity-card", 461, 300, { radius: 16, fill: C.white });
  const cover = box("cover", 461, 112, { fill: C.primary });
  add(card, cover);
  cover.x = 0;
  cover.y = 0;

  const avatarWrap = box("avatar-wrap", 120, 120, {});
  const ring = box("avatar-ring", 120, 120, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 60, fill: C.accentIndigo, opacity: 0.3 });
  const inner = box("avatar-inner", 112, 112, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 56, fill: C.white, pad: 4 });
  add(inner, avatar("Alex Vance", 104, "circle"));
  add(ring, inner);
  add(avatarWrap, ring);
  const cam = box("cam-btn", 32, 32, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 16, fill: C.white });
  add(cam, icon("camera", 16, C.brand));
  add(avatarWrap, cam);
  cam.x = 88;
  cam.y = 88;
  add(card, avatarWrap);
  avatarWrap.x = 32;
  avatarWrap.y = 52;

  const name = txt("Coach Alex Vance", { size: 18, weight: 800, color: C.ink });
  add(card, name);
  name.x = 24;
  name.y = 192;

  const handle = txt("@coach_alex", { size: 12, weight: 700, color: C.ink, ls: 0.24 });
  add(card, handle);
  handle.x = 24;
  handle.y = 218;

  const btn = box("change-avatar", 413, 36, { dir: "HORIZONTAL", gap: 8, padL: 16, padR: 16, align: "CENTER", justify: "CENTER", radius: 9999, fill: C.s2 });
  add(btn, icon("upload", 14, C.brand));
  add(btn, txt("Ganti Foto", { size: 12, weight: 700, color: C.ink }));
  add(card, btn);
  btn.x = 24;
  btn.y = 254;
  return card;
}

function fieldRow(label, value, iconName, o) {
  o = o || {};
  const f = box("field", null, null, { dir: "VERTICAL", gap: 6 });
  const lbl = box("label", null, null, { dir: "HORIZONTAL", align: "CENTER" });
  add(lbl, overline(label));
  add(f, stretch(lbl));
  const input = box("input", null, 40, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, align: "CENTER", radius: 12, fill: o.readonly ? C.s2 : C.tint });
  if (iconName) add(input, icon(iconName, 16, C.muted));
  add(input, grow(txt(value, { size: 14, weight: 400, color: C.ink })));
  if (o.select) add(input, icon("chevron-down", 14, C.muted));
  add(f, stretch(input));
  return f;
}

function personalInfoCard() {
  const card = box("personal-card", null, null, { dir: "VERTICAL", gap: 16, pad: 24, radius: 16, fill: C.white });
  add(card, txt("Informasi Pribadi", { size: 18, weight: 800, color: C.ink }));
  add(card, txt("Identitas utama yang ditampilkan di ekosistem atlet dan direktori bimbingan.", { size: 12, weight: 400, color: C.inkSoft }));

  const rows = [
    [["Nama Profesional", "Alex Vance", "user", {}], ["Alamat Email (read-only)", "alex.vance@bugarin.com", "mail", { readonly: true }]],
    [["Username (read-only)", "@coach_alex", "lock", { readonly: true }], ["Lokasi Gym", "Fithub Orlando", "map-pin", {}]],
    [["Jenis Kelamin", "Laki-laki", null, { select: true }], ["Usia", "33", "calendar-days", {}]],
    [["Spesialisasi", "Turun BB", null, { select: true }], null],
  ];
  const grid = box("form-grid", null, null, { dir: "VERTICAL", gap: 16 });
  for (const r of rows) {
    const row = box("form-row", null, null, { dir: "HORIZONTAL", gap: 16, align: "MIN" });
    for (const cell of r) {
      if (!cell) {
        add(row, grow(box("empty", null, 0, { dir: "VERTICAL" })));
        continue;
      }
      add(row, grow(fieldRow(cell[0], cell[1], cell[2], cell[3])));
    }
    add(grid, stretch(row));
  }
  add(card, stretch(grid));

  add(card, box("gap", null, 8, { dir: "VERTICAL" }));
  const actions = box("form-actions", null, null, { dir: "HORIZONTAL", gap: 12, justify: "MAX" });
  add(actions, button("Batalkan", { fill: C.s2, color: C.ink, radius: 9999, padX: 20, h: 36, size: 14 }));
  add(actions, button("Simpan Perubahan", { icon: icon("save", 16, C.white), fill: C.brand, color: C.white, radius: 9999, padX: 20, h: 36, size: 14 }));
  add(card, stretch(actions));
  return card;
}

function preferencesCard() {
  const card = box("pref-card", null, null, { dir: "VERTICAL", gap: 24, pad: 24, radius: 16, fill: C.white });
  add(card, txt("Preferensi & Keamanan", { size: 18, weight: 800, color: C.ink }));
  add(card, txt("Kontrol tampilan ruang kerja dan jaga keamanan akses akunmu.", { size: 12, weight: 400, color: C.inkSoft }));

  const appearance = box("appearance", null, null, { dir: "HORIZONTAL", gap: 16, pad: 16, align: "CENTER", justify: "SPACE_BETWEEN", radius: 16, fill: C.tint });
  const aLeft = box("appearance-left", null, null, { dir: "VERTICAL", gap: 2 });
  add(aLeft, txt("Mode Tampilan Antarmuka", { size: 14, weight: 700, color: C.ink }));
  add(aLeft, txt("Pilih antara tampilan terang kontras tinggi dan mode gelap.", { size: 12, weight: 400, color: C.inkSoft }));
  add(appearance, aLeft);
  const seg = box("seg", null, 36, { dir: "HORIZONTAL", gap: 4, pad: 4, align: "CENTER", radius: 9999, fill: C.s2 });
  const on = box("seg-light", null, 28, { dir: "HORIZONTAL", gap: 8, padL: 16, padR: 16, align: "CENTER", radius: 9999, fill: C.white });
  add(on, icon("sun", 14, C.warning));
  add(on, txt("Terang", { size: 12, weight: 700, color: C.ink }));
  add(seg, on);
  const off = box("seg-dark", null, 28, { dir: "HORIZONTAL", gap: 8, padL: 16, padR: 16, align: "CENTER", radius: 9999 });
  add(off, icon("moon", 14, C.muted));
  add(off, txt("Gelap", { size: 12, weight: 700, color: C.muted }));
  add(seg, off);
  add(appearance, seg);
  add(card, stretch(appearance));

  const rot = box("rotation", null, null, { dir: "VERTICAL", gap: 16 });
  const rh = box("rot-head", null, null, { dir: "VERTICAL", gap: 2 });
  add(rh, txt("Rotasi Kunci Autentikasi", { size: 14, weight: 700, color: C.ink }));
  add(rh, txt("Pastikan password berisi 8+ karakter.", { size: 12, weight: 400, color: C.muted }));
  add(rot, rh);

  const pw = box("pw-field", null, null, { dir: "VERTICAL", gap: 6 });
  add(pw, overline("Password Saat Ini"));
  const pwInput = box("pw-input", null, 40, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, align: "CENTER", radius: 12, fill: C.tint });
  add(pwInput, icon("key-round", 16, C.muted));
  add(pwInput, grow(txt("••••••••", { size: 14, weight: 400, color: C.ink })));
  add(pwInput, icon("eye", 16, C.muted));
  add(pw, stretch(pwInput));
  add(rot, stretch(pw));

  const rotActions = box("rot-actions", null, null, { dir: "HORIZONTAL", justify: "MAX" });
  add(rotActions, button("Ganti Password", { fill: C.brand, color: C.white, radius: 9999, padX: 20, h: 36, size: 14 }));
  add(rot, stretch(rotActions));
  add(card, stretch(rot));
  return card;
}

function bbChart(points) {
  const W = 1376;
  const H = 240;
  const pad = 40;
  const values = points.map((p) => p.value);
  const min = Math.min.apply(null, values);
  const max = Math.max.apply(null, values);
  const span = max - min || 1;
  const stepX = (W - pad * 2) / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (p.value - min) / span) * (H - pad * 2);
    return [x, y];
  });
  const poly = coords.map((c) => c[0].toFixed(1) + "," + c[1].toFixed(1)).join(" ");
  const grid = [0, 0.25, 0.5, 0.75, 1]
    .map((t) => {
      const y = (pad + t * (H - pad * 2)).toFixed(1);
      return '<line x1="' + pad + '" y1="' + y + '" x2="' + (W - pad) + '" y2="' + y + '" stroke="#EBEDFB" stroke-width="1" stroke-dasharray="3 3"/>';
    })
    .join("");
  const dots = coords.map((c) => '<circle cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" r="3" fill="#7DC04E"/>').join("");
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + " " + H + '">' +
    grid +
    '<polyline points="' + poly + '" fill="none" stroke="#7DC04E" stroke-width="2"/>' +
    dots +
    "</svg>";
  const node = figma.createNodeFromSvg(svg);
  node.name = "chart-bb";
  return node;
}

function infoItem(label, value) {
  const f = box("info-item", null, null, { dir: "VERTICAL", gap: 4, pad: 16, radius: 12, fill: C.tint });
  add(f, txt(label, { size: 10, weight: 600, color: C.muted, ls: 0.5, upper: true }));
  add(f, txt(value, { size: 18, weight: 600, color: C.ink }));
  return f;
}

function buildKlienDetail(content) {
  const back = box("back", null, 32, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
  add(back, icon("arrow-left", 16, C.ink));
  add(back, txt("Kembali ke Klien", { size: 14, weight: 600, color: C.ink }));
  add(content, back);

  const profile = box("detail-profile", null, null, { dir: "VERTICAL", gap: 24, pad: 24, radius: 16, fill: C.white });
  const top = box("detail-top", null, null, { dir: "HORIZONTAL", gap: 20, align: "CENTER" });
  add(top, avatar("Marcus Sterling", 80, "square"));
  const info = box("detail-info", null, null, { dir: "VERTICAL", gap: 4 });
  add(info, txt("Marcus Sterling", { size: 40, weight: 800, color: C.ink, ls: -0.7 }));
  const badges = box("detail-badges", null, null, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
  add(badges, badgeTujuan("naik_bb"));
  add(badges, pill("56 Hari", { fill: C.s3, color: C.inkSoft, size: 11, h: 22, padL: 10, padR: 10 }));
  add(info, badges);
  add(top, info);
  add(profile, stretch(top));

  const metrics = box("metrics", null, null, { dir: "VERTICAL", gap: 16 });
  const m = [
    ["Umur", "29 tahun"],
    ["Jenis Kelamin", "Laki-laki"],
    ["Tinggi Badan", "180 cm"],
    ["BB Awal", "78 kg"],
    ["BB Tujuan", "88 kg"],
    ["BB Sekarang", "82 kg"],
  ];
  for (let i = 0; i < m.length; i += 3) {
    const row = box("metric-row", null, null, { dir: "HORIZONTAL", gap: 16 });
    for (const pair of m.slice(i, i + 3)) add(row, grow(infoItem(pair[0], pair[1])));
    add(metrics, stretch(row));
  }
  add(profile, stretch(metrics));
  add(content, stretch(profile));

  const chartCard = box("chart-card", null, null, { dir: "VERTICAL", gap: 0, pad: 24, radius: 16, fill: C.white });
  add(chartCard, txt("Grafik Berat Badan", { size: 20, weight: 600, color: C.ink }));
  add(chartCard, txt("Riwayat penimbangan klien.", { size: 12, weight: 400, color: C.muted }));
  add(chartCard, box("gap", null, 16, { dir: "VERTICAL" }));
  add(chartCard, bbChart([
    { label: "1 Agu", value: 78 },
    { label: "8 Agu", value: 78.6 },
    { label: "15 Agu", value: 79.4 },
    { label: "22 Agu", value: 80.3 },
    { label: "29 Agu", value: 81.1 },
    { label: "5 Sep", value: 82 },
  ]));
  add(content, stretch(chartCard));

  const plan = box("plan-card", null, null, { dir: "VERTICAL", gap: 0, pad: 24, radius: 16, fill: C.white });
  const ptitle = box("plan-title", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER" });
  add(ptitle, txt("Weekly Plan", { size: 20, weight: 600, color: C.ink }));
  add(ptitle, pill("Menunggu Review", { fill: C.s3, color: C.muted, size: 11, h: 20, padL: 10, padR: 10 }));
  add(plan, ptitle);
  add(plan, box("gap", null, 16, { dir: "VERTICAL" }));

  const cols = box("plan-cols", null, null, { dir: "HORIZONTAL", gap: 24, align: "MIN" });
  const wcol = box("workout-col", null, null, { dir: "VERTICAL", gap: 12 });
  const wl = box("wl-title", null, null, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
  add(wl, icon("dumbbell", 16, C.brand));
  add(wl, txt("Rencana Latihan", { size: 14, weight: 600, color: C.ink }));
  add(wcol, wl);
  const wlist = box("wlist", null, null, { dir: "VERTICAL", gap: 8 });
  const workouts = [
    ["Senin · 09:00", "Push Day · pusatgym"],
    ["Rabu · 09:00", "Pull Day · pusatgym"],
    ["Jumat · 09:00", "Leg Day · pusatgym"],
  ];
  for (const w of workouts) {
    const it = box("witem", null, null, { dir: "VERTICAL", gap: 2, padL: 16, padR: 16, padT: 12, padB: 12, radius: 12, fill: C.alt });
    add(it, txt(w[0], { size: 14, weight: 600, color: C.ink }));
    add(it, txt(w[1], { size: 14, weight: 400, color: C.inkSoft }));
    add(wlist, stretch(it));
  }
  add(wcol, stretch(wlist));
  add(cols, grow(wcol));

  const mcol = box("meal-col", null, null, { dir: "VERTICAL", gap: 12 });
  const ml = box("ml-title", null, null, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
  add(ml, icon("salad", 16, C.success));
  add(ml, txt("Rencana Menu", { size: 14, weight: 600, color: C.ink }));
  add(mcol, ml);
  const mlist = box("mlist", null, null, { dir: "VERTICAL", gap: 8 });
  const meals = [
    ["Sarapan", "Oatmeal + telur · 420 kkal"],
    ["Makan Siang", "Nasi + ayam + sayur · 650 kkal"],
    ["Makan Malam", "Salmon + brokoli · 520 kkal"],
  ];
  for (const mm of meals) {
    const it = box("mitem", null, null, { dir: "VERTICAL", gap: 2, padL: 16, padR: 16, padT: 12, padB: 12, radius: 12, fill: C.alt });
    add(it, txt(mm[0], { size: 14, weight: 600, color: C.ink }));
    add(it, txt(mm[1], { size: 14, weight: 400, color: C.inkSoft }));
    add(mlist, stretch(it));
  }
  add(mcol, stretch(mlist));
  add(cols, grow(mcol));
  add(plan, stretch(cols));

  add(plan, box("gap", null, 16, { dir: "VERTICAL" }));
  const pactions = box("plan-actions", null, null, { dir: "HORIZONTAL", gap: 12, justify: "MAX" });
  add(pactions, button("Override", { fill: C.s2, color: C.ink, radius: 9999, padX: 16, h: 40 }));
  add(pactions, button("Setujui", { icon: icon("check", 16, C.white), fill: C.primary, color: C.white, radius: 9999, padX: 16, h: 40 }));
  add(plan, stretch(pactions));
  add(content, stretch(plan));
}

function loginScreen() {
  const root = box("Login (Web App)", SCREEN_W, 1117, { dir: "HORIZONTAL" });
  const left = box("photo-panel", SCREEN_W / 2, 1117, { gradient: [C.primary, C.success, C.sidebar] });
  add(root, left);
  const right = box("form-panel", SCREEN_W / 2, 1117, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", fill: C.tint });
  const form = box("form", 480, null, { dir: "VERTICAL", gap: 0 });
  add(form, txt("Welcome Back, Coach", { size: 36, weight: 800, color: C.ink }));

  const fields = box("fields", null, null, { dir: "VERTICAL", gap: 20, padT: 32 });
  const email = box("email-field", null, null, { dir: "VERTICAL", gap: 8 });
  add(email, txt("Email Address", { size: 14, weight: 500, color: C.ink }));
  const emailInput = box("input-email", 480, 40, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, align: "CENTER", radius: 8, fill: C.white });
  add(emailInput, icon("mail", 16, C.muted));
  add(emailInput, txt("coach@bugarin.com", { size: 14, weight: 400, color: C.muted }));
  add(email, emailInput);
  add(fields, email);

  const pw = box("pw-field", null, null, { dir: "VERTICAL", gap: 8 });
  const pwLabel = box("pw-label", 480, null, { dir: "HORIZONTAL", align: "CENTER", justify: "SPACE_BETWEEN" });
  add(pwLabel, txt("Password", { size: 14, weight: 500, color: C.ink }));
  add(pwLabel, txt("Forgot Password?", { size: 12, weight: 500, color: C.secondaryStrong }));
  add(pw, pwLabel);
  const pwInput = box("input-pw", 480, 40, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, align: "CENTER", radius: 8, fill: C.white });
  add(pwInput, icon("lock", 16, C.muted));
  add(pwInput, grow(txt("••••••••", { size: 14, weight: 400, color: C.ink })));
  add(pwInput, icon("eye", 16, C.muted));
  add(pw, pwInput);
  add(fields, pw);
  add(form, fields);

  add(form, box("gap", null, 24, { dir: "VERTICAL" }));
  const signIn = box("sign-in", 480, 40, { dir: "HORIZONTAL", align: "CENTER", justify: "CENTER", radius: 8, fill: C.primary });
  add(signIn, txt("Sign In", { size: 14, weight: 600, color: C.white }));
  add(form, signIn);

  add(right, form);
  add(root, right);
  return root;
}

async function main() {
  await loadFonts();
  let page = null;
  for (const p of figma.root.children) {
    if (p.type === "PAGE" && p.name.replace(/\s+/g, " ").trim() === "UI Website PT") page = p;
  }
  if (!page && figma.currentPage.type === "PAGE") page = figma.currentPage;
  if (!page) {
    figma.closePlugin("Halaman 'UI Website PT' tidak ditemukan.");
    return;
  }
  figma.currentPage = page;

  let maxRight = 0;
  let minY = 0;
  let first = true;
  for (const n of page.children) {
    const x = n.x || 0;
    const w = n.width || 0;
    const y = n.y || 0;
    if (x + w > maxRight) maxRight = x + w;
    if (first) {
      minY = y;
      first = false;
    } else if (y < minY) {
      minY = y;
    }
  }

  const startX = maxRight + 400;
  let cursorY = minY;
  const gapY = 120;
  const frames = [
    loginScreen(),
    ptScreen("Dashboard (Web App)", "dashboard", 1000, buildDashboard),
    ptScreen("Verifikasi (Web App)", "verifikasi", 1117, buildVerifikasi),
    ptScreen("Klien (Web App)", "klien", 1180, buildKlien),
    ptScreen("Riwayat (Web App)", "riwayat", 1050, buildRiwayat),
    ptScreen("Feedback (Web App)", "feedback", 1117, buildFeedback),
    ptScreen("Feedback - Kosong (Web App)", "feedback", 1117, buildFeedbackEmpty),
    ptScreen("Profil (Web App)", "profil", 1200, buildProfil),
    ptScreen("Detail Klien (Web App)", "klien", 1500, buildKlienDetail),
  ];
  for (const f of frames) {
    page.appendChild(f);
    f.x = startX;
    f.y = cursorY;
    cursorY += f.height + gapY;
  }
  figma.viewport.scrollAndZoomIntoView(frames);
  const fontNote = USED_FALLBACK
    ? "Font: Inter (fallback) — pasang Plus Jakarta Sans untuk hasil 100%."
    : "Font: Plus Jakarta Sans.";
  figma.closePlugin("Selesai: 9 frame baru dibuat di halaman 'UI Website PT' (desain lama tidak diubah). " + fontNote);
}

main().catch((err) => {
  figma.closePlugin("Gagal: " + (err && err.message ? err.message : String(err)));
});
