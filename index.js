// import contentful from 'contentful'
function addWorkCard(params = {}) {
  /*inicializo un objeto si no le pasamos parametros para que no de undefined */
  const template = document.querySelector("#portfolio-card-template"); // Seleccionamos el template
  const container = document.querySelector(".portfolio-content"); // Seleccionamos el container donde va a ir el template (cada card)
  template.content.querySelector(".portfolio-card-title").textContent =
    params.title;

  template.content.querySelector(".portfolio-card-text").textContent =
    params.description;

  template.content.querySelector(".portfolio-img").src = params.image;

  template.content.querySelector(".portfolio-card-link").href = params.url;

  const clone = document.importNode(template.content, true);
  // importNode: Crea una copia de un nodo desde un documento externo para ser insertado en el documento actual.
  // El nodo original no se borra del documento. El nodo importado es un clon del original.
  container.appendChild(clone);
}
function getWorks() {
  return fetch(
    "https://cdn.contentful.com/spaces/65tugjdrayxe/environments/master/entries?access_token=YZ3qsAbVyVQLJijbty4MvoP6Tf-7NCLDeF7htqnsSOo&content_type=portfolioDesafioCms")
    .then((res) => {
      return res.json();
    }) // Parseamos el objeto que me devuelve fetch en json
    .then((data) => {
      console.log(data);
      const fieldsCollection = data.items.map((item) => {
        return {
          title: item.fields.title,
           description: item.fields.description,
           image: item.fields.url
        
        };
      });

      return fieldsCollection
    });
}
function main() {
  getWorks().then((works) => {
    for (const w of works) {
      addWorkCard(w);
    }
  });
}
main();
