Aplikacje SPA komunikują się z serwerem wysyłając dane uwierzytelniające (prawdopodobna rejestracja lub logowanie). W odpowiedzi nie otrzymujemy z powrotem sesji lecz token ponieważ serwer ma charakter bezstanowy. Token można utożsamiać z obiektem JS i kodować go jako JSON. Pobrany obiekt musi być przechowywany w localStorage lub w stanie Redux-a. W momencie gdy wysyłamy żądanie do serwera (chronione zasoby) wysyłamy Token. Serwer sprawdza ważność Tokena - tylko tokeny wysylane przez serwer są akceptowane na serwerze. 