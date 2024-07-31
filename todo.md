1.  
    * Resetta droplet:en och skapa dockercontainrarna med hjälp utav textfilen med sparade kommandon. Som användes för den lokala datorn. 
    * Se till att droplet-servern endast exponerar porten 8080 utåt och att endast frontend appen (på vercel) kan skicka requests dit.

2. Sök jobb med appen som portfolio när punkt 1 är löst.

3. Skapa en CI-pipeline på github som uppdaterar Dockerimage:n när ny kod pushas in (för Java-backend).