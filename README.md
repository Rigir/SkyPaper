# SkyPaper 📄🛫

* Do wynkonania: 
  * Strona powinna być responsywna.
  * Formularz transportu:
    * Powinien składać się z następujący pól:
      * Transport z (pole tekstowe, wymagane)
      * Transport do (pole tekstowe, wymagane)
      * Typ samolotu (możliwość wybrania jednego z dwóch rodzajów, wymagane)
        * Ograniczenia do wartości: Airbus A380, Boeing 747
      * Dokumenty przewozowe ( Drag&Drop na pliki, opcjonalne)
        * Ograniczenia do typu pliku: jpg, png, doc, docx, pdf
      * Data transportu (możliwość wyboru daty z kalendarza, pole wymagane)
        * Transport może się odbywać tylko i wyłącznie od poniedziałku do piątku.
    * Może zawierać 1 lub wiele towarów.
      * Pola dla kolejnego ładunku powinny być dodawane dynamicznie przez użytkownika np. za pomocą przycisku „Dodaj” kolejny ładunek.
      * Pola dla pojedynczego ładunku:
        * Nazwa ładunku (pole tekstowe, wymagane)
        * Ciężar ładunku w kg (pole liczbowe, wymagane)
          * Pojedynczy ładunek nie może przekraczać maksymalnego ciężaru w zależności od wybranego typu samolotu. 
            * Ograniczenia do wartości: Airbus A380 ( 35 ton ), Boeing 747 ( 38 ton )
        * Typ ładunku (możliwość wybrania jednego z dwóch rodzajów, pole wymagane)
          * Ograniczenia do wartości: ładunek zwykły, ładunek niebezpieczny

* Dodatkowe:
  * Dodatkowo informacje o transporcie powinny zostać zamodelowane w Pimcore oraz zapisywać się jako DataObjecty.
  * Wysłanie formularza w zależności od typu samolotu na odpowiadający mu email.
  * Wiadomość powinna zawierać w załączniku:
    * Dane z formularza transportu
    * Tabelę z listą towarów zgłoszonychdo transportu,
