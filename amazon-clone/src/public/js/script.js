// Client-side JavaScript for Amazon Clone

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  // Product quantity buttons
  const quantityInputs = document.querySelectorAll('.cart-item-quantity input');
  
  quantityInputs.forEach(input => {
    const decrementBtn = input.previousElementSibling;
    const incrementBtn = input.nextElementSibling;
    
    if (decrementBtn && incrementBtn) {
      decrementBtn.addEventListener('click', function() {
        if (input.value > 1) {
          input.value = parseInt(input.value) - 1;
          updateCartForm(input);
        }
      });
      
      incrementBtn.addEventListener('click', function() {
        input.value = parseInt(input.value) + 1;
        updateCartForm(input);
      });
      
      input.addEventListener('change', function() {
        if (input.value < 1) {
          input.value = 1;
        }
        updateCartForm(input);
      });
    }
  });
  
  function updateCartForm(input) {
    const form = input.closest('form');
    if (form) {
      form.submit();
    }
  }

  // Product image gallery
  const mainImage = document.querySelector('.product-main-image img');
  const thumbnails = document.querySelectorAll('.product-thumbnails img');
  
  if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        mainImage.src = this.src;
        thumbnails.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  // Form validation
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          const errorMessage = field.dataset.errorMessage || 'This field is required';
          let errorElement = field.nextElementSibling;
          
          if (!errorElement || !errorElement.classList.contains('field-error')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('field-error');
            field.parentNode.insertBefore(errorElement, field.nextSibling);
          }
          
          errorElement.textContent = errorMessage;
        } else {
          field.classList.remove('error');
          const errorElement = field.nextElementSibling;
          if (errorElement && errorElement.classList.contains('field-error')) {
            errorElement.remove();
          }
        }
      });
      
      if (!isValid) {
        event.preventDefault();
      }
    });
  });

  // Search suggestions
  const searchInput = document.querySelector('.search-bar input');
  const suggestionsContainer = document.querySelector('.search-suggestions');
  
  if (searchInput && suggestionsContainer) {
    searchInput.addEventListener('input', function() {
      const query = this.value.trim();
      
      if (query.length > 2) {
        // In a real app, this would make an AJAX request to get suggestions
        // For demo purposes, we'll just show some mock suggestions
        const mockSuggestions = [
          'Wireless Headphones',
          'Wireless Earbuds',
          'Wireless Keyboard',
          'Wireless Mouse',
          'Wireless Charger'
        ].filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()));
        
        if (mockSuggestions.length > 0) {
          suggestionsContainer.innerHTML = '';
          mockSuggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.classList.add('suggestion-item');
            item.textContent = suggestion;
            item.addEventListener('click', function() {
              searchInput.value = suggestion;
              suggestionsContainer.innerHTML = '';
              suggestionsContainer.style.display = 'none';
            });
            suggestionsContainer.appendChild(item);
          });
          suggestionsContainer.style.display = 'block';
        } else {
          suggestionsContainer.style.display = 'none';
        }
      } else {
        suggestionsContainer.style.display = 'none';
      }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(event) {
      if (!searchInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
        suggestionsContainer.style.display = 'none';
      }
    });
  }
});