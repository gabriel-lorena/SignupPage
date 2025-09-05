// Array para simular um "banco de dados" de emails
let registeredEmails = JSON.parse(localStorage.getItem('registeredEmails')) || [];

// Função para lidar com o cadastro
function handleLogin(event) {
    event.preventDefault();

    // Pegando os valores dos campos
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const repetirSenha = document.getElementById('repetir-senha').value;

    // Validações
    if (!name || name.length < 2) {
        showError("Por favor, insira um nome válido (mínimo 2 caracteres).");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        showError("Por favor, insira um email válido.");
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
    if (!passwordRegex.test(password)) {
        showError("A senha deve ter pelo menos 6 caracteres, incluindo letra maiúscula, minúscula e um caractere especial.");
        return;
    }

    if (password !== repetirSenha) {
        showError("As senhas não coincidem. Tente novamente.");
        return;
    }

    // Verificar se o email já foi cadastrado
    if (registeredEmails.includes(email)) {
        showError("Este e-mail já foi cadastrado.");
        return;
    }

    // Adiciona o email ao array e salva no localStorage
    registeredEmails.push(email);
    localStorage.setItem('registeredEmails', JSON.stringify(registeredEmails));

    // Exibindo no console (sem log da senha)
    console.log("Formulário enviado");
    console.log("Nome:", name);
    console.log("Email:", email);

    showSuccess("Cadastro realizado com sucesso!");
    document.getElementById('LoginForm').reset();
}

// Função para exibir mensagens de erro
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
}

// Função para exibir mensagens de sucesso
function showSuccess(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.color = 'green';
}