Nodejs jest środowiskiem uruchomieniowym JavaScript. Nodejs jest "inną wersją", jest w zasadzie zbudowany na JavaScript ale dodaje do niego pewne funkcje. Nodejs umożliwia posługiwanie się językiem JavaScript nie tylko w przeglądarce ale również na serwerze.

c++ --> V8 (Nodejs, JavaScript) --> Machine Code 

Po stronie klienta używamy html, css oraz js. Użytkownik wysyła zapytania do serwera i otrzymuje odpowiedz, może łąćzyć się z bazą danych. Po stronie serwera również możemy wykonać pewne operacje których ze względu na bezpieczństwo czy też wydajność nie wykonamy po stronie klienta w przeglądarce.

Podejście REPL - Read Eval Print Loop - wykonujemy kod podczas pisania.
Execute Files - wykorzystywane w prawdziwych aplikacjach.

Moduły
1. http - uruchomienie serwera, wysyłanie requests
2. https - umożliwia uruchamianie SSL
3. fs
4. path
5. os

Start Serwera

const http = require('http')

const server = http.createServer((req,res)=>{
    console.log(req)
})

server.listen(3000)

Można zarejestrować funkcje kodu, które działają kiedyś w przyszłości ale nie koniecznie teraz. Kod po kodzie fnkcji która znajduje się wcześniej może zostać wywołany przed ponieważ mamy do czynienia z wywołaniem zwrotnym, które zostanie nazwane kiedyś w przyszłości. Nie chcemy blokować kodu zawsze chcemy być w oczekiwaniu aż nowe zdarzenia zpetlą pętlę zdarzeń, a następnie wykonają kod i nigdy nie będą blokować tej pętli zdarzeń zbyt długo. 

Używanie synchrnizacji plików zapisu oznacza synchroniczniczne i jest to specjalna metoda która faktycznie blokuje wykonywanie kody, dopóki ten plik nie zostanie utworzony. 

Praca z plikami następuje w dwóch trybach. Pierwszy jest synchroniczny i blokuje wykonanie następnego wiersza kodu, dopóki ten plik nie zostanie ukończony. Ma zastsowanie w przypadku małych plików.
fs.writeFileSync('message.txt',message);
Drugim jest tryb asynchroniczny, który oprócz scieżki i danych akceptuje też trzeci argument callback - funkcja która powinna zostać wykonana po jej zakończeniu. 

W Node.js architektura oparta jest na zdarzeniach, w której po prostu mówisz nodejs, proszę, zrób coś a nastepnie przeprowadz ten proces do systemu operacyjnego, który używa wielowątkowości itd. A następnie kontynuj pętlę zdarzeń, aby nasłuchiwać wywołań zdarzeń i zawsze wsyłaj tak małe akcje, aby nigdy nie blokować wykonywania kodu. 

NIGDY NIE NASTEPUJE BLOKOWANIE SYSTREMU/SERWERA!!!

Node.js używa tylko jednego pojedyńczego JavaScript-owego wątku, można go utożsamiać z procesem w naszym systemie operacyjnym. 

"fs" daje dostęp do systemu plików.

Event Loop - uruchamiana jest przez nodejs podczas uruchamiania naszego programu automatycznie. Jest ona odpowiedzialna za obsługę wywołań zwrotnych zdarzeń - za uruchomienie kodu po wystąpieniu określonego zdarzenia. Event Loop obsłuży tylko wywołania zwrotne które zawierają szybko kończący się kod. 
Większe pliki i długie operacje są wysyłane do Worker Pool, która jest zarządzana przez nodejs. Worker Pool oderwana jest od JS i działa na różnych wątkach. Po wykonaniu pracy Worker Pool uruchomi "Trigger Callback" który połączy się z Event Loop. 

Event Loop na początku każdej nowej iteracji sprawwdza czy są jakieś wywołania czasowe, które powinna wykonać. W dalszej kolejności sprawdza inne wywołania zwrotne gdy mamy zapis lub odczyt pliku (wszelkie operacje na plikach, ale też operacje sieciowe,...). Kolejna faza to faza przeciągania w której Node.js szuka nowych zdarzeń IO i zrobi wszystko, aby od razu wykonać ich callback jak również sprawdza wywołania czasowe i jeśli takie się znajdują przeskakuje aby je wykonać. W fazie sprawdzania będą wykonane natychmiastowe wywołania zwrotne. Wywołania natychmiastowe setImmediate() zostanie wykonane natychmiast ale zawsze po wykonaniu otwarych wywołań zwrotnych. W piątej fazie Node.js wywoła wszystkie zamknięte wywołania zwrotne. 
Każde wywołania zwrotne zwiększa refs (process.exit refs==0)

