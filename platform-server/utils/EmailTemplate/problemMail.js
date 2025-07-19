



const generateProblemAddEmailTemplate = (Name, problemName, link) => {
        const message = `
    Hey There
    
        ${Name} is recently added a Problem "${problemName}"
        
        To solve this Tap the below Link
        Problem : ${link}
    
        Note : This is an auto generated Mail so please do not reply to this mail.
            `;
    return message;
}

module.exports = generateProblemAddEmailTemplate