module.exports = {

    /**
     *
     * @param {Date} date The date to be formatted
     * @returns {String} The formatted date
     */
    format: (date) => {
        const now = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        let timeAgo = '';

        const yearDiff = now.getFullYear() - year;
        const monthDiff = (now.getMonth() - date.getMonth()) + (yearDiff * 12);
        const dayDiff = now.getDate() - date.getDate();

        if (yearDiff >= 2) {
            timeAgo = `(Há ${yearDiff} anos atrás)`;
        } else if (yearDiff === 1) {
            timeAgo = `(Há 1 ano atrás)`;
        } else if (monthDiff > 1) {
            timeAgo = `(Há ${monthDiff} meses atrás)`;
        } else if (dayDiff === 0 && monthDiff === 0 && yearDiff === 0) {
            timeAgo = '(Hoje)';
        } else if (monthDiff === 0 && yearDiff === 0) {
            timeAgo = '(Esse mês)';
        }

        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${timeAgo}`;
        return formattedDate;
    }
}
