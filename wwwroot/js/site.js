$(document).ready(function () {
    // Adiciona o evento de input dinamicamente
    $("#search-term").on("input", function () {
        const searchTerm = $(this).val(); // Obtém o valor digitado no input
        console.log("Texto digitado:", searchTerm);

        if (searchTerm.length > 0) { // Verifica se há texto para buscar
            $.ajax({
                url: `http://localhost:5076/Movies/GetAll`, // Endpoint no servidor
                type: "GET", // Método HTTP
                data: { title: searchTerm }, // Envia o termo de busca para o servidor
                success: function (datas) {
                    console.log("Resultados recebidos:", datas);
                    let resultsHtml
                    // Monta o HTML de forma 
                    if(datas.length > 0) {
                        resultsHtml = datas.map(data => `<p>${data.title}</p>`).join("");
                    } else {
                        $("#results").html("Nenhum resultado encontrado.")
                    }

                    // Insere o HTML no elemento #results
                    $("#results").html(resultsHtml);
                },
                error: function (error) {
                    console.error("Erro na requisição:", error);
                }
            });
        } else {
            // Limpa os resultados quando o input estiver vazio
            $("#results").html("");
        }
    });
});
