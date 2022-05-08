
const GetDate = () => {
    const today = new Date();

    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    }
    return today.toLocaleDateString('ru', options);
}

export default GetDate;