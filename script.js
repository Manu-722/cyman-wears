function onSubmit() {
    alert("Form submitted successfully");
    return true;
    }
    
    function welcomeMsg(name) {
        return ("Hello " + name + ", welcome to our website!")
    }

    function welcomeMsg() {
        // Prevent the default form submission behavior
        event.preventDefault();
    
        // Get form values (Optional: validation can be added here)
        const username = document.getElementById("username").value;
    
        // Show success message
        alert(`Welcome, ${username}! Your sign-up was successful.`);
    }
    function showPopupAndRedirect() {
        alert("Your message here!");
        window.location.href = "index.html"; 
    }
    