// Vamos encontrar o formulário no DOM
let formElement = document.querySelector('.pop-up')

const pop
// Em seguida vem o handler do submit
// ainda não vai enviar para lugar nenhum

// Observe que o nome da função começa com um verbo
// e descreve exatamente o que a função faz
function handleProfileFormSubmit(evt) {
    // Esta linha impede o navegador 
    // de enviar o formulário da forma padrão.
    evt.preventDefault(); 
    // Fazendo isso, podemos definir nossa própria forma de enviar o formulário.
    // Explicaremos em mais detalhes posteriormente.

    // Vamos encontrar os campos de formulário do DOM
    let nameInput = // Use querySelector()
    let jobInput = // Use querySelector()

    // Pegue os valores de cada campo do valor da propriedade correspondente

    // Selecione os elementos aos quais os valores dos campos serão inseridos

    // Insira novos valores usando a
    // propriedade textContent
}

// Conecte o handler ao formulário:
// ele vai observar o evento de submit
formElement.addEventListener('submit', handleProfileFormSubmit);