const loader = document.getElementById('loading');

export const showLoading = () => {
    loader.classList.add('show');
};

export const hideLoading = () => {
    loader.classList.remove('show');
};
