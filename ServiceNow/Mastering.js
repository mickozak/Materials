//1. Relationship tworzy relacje między polami w tej samej tabeli np.: pokoje na tym samy piętrze w hotelu.
(function refineQuery(current, parent) {   current.addQuery('floor', parent.floor); })(current, parent); 
//2. RelatedList tworzy relacje między listami;
//3. Views widoki z różnym poziomem szczegółowości. System UI > View Rules;
//4. Moduły przechowywane w sys_app_module - ułatwiają nawigację po aplikacjach. Wstawiają odniesienie po lewej stronie;
