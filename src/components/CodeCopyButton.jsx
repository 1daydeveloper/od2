"use client";
import { useEffect } from "react";

export default function CodeCopyButton() {
  useEffect(() => {
    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll('.blog-post-content pre');
      
      codeBlocks.forEach((pre) => {
        // Skip if button already exists
        if (pre.querySelector('.copy-code-button')) return;
        
        // Create wrapper if not already wrapped
        if (!pre.parentElement.classList.contains('code-block-wrapper')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'code-block-wrapper relative group';
          pre.parentNode.insertBefore(wrapper, pre);
          wrapper.appendChild(pre);
        }
        
        // Create copy button
        const button = document.createElement('button');
        button.className = 'copy-code-button absolute top-2 right-2 p-2 rounded-md bg-muted hover:bg-muted/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-border';
        button.setAttribute('aria-label', 'Copy code');
        button.innerHTML = `
          <svg class="copy-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <svg class="check-icon w-4 h-4 hidden text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        `;
        
        button.addEventListener('click', async () => {
          const code = pre.querySelector('code');
          const text = code ? code.textContent : pre.textContent;
          
          try {
            await navigator.clipboard.writeText(text);
            
            // Show check icon
            const copyIcon = button.querySelector('.copy-icon');
            const checkIcon = button.querySelector('.check-icon');
            copyIcon.classList.add('hidden');
            checkIcon.classList.remove('hidden');
            
            // Reset after 2 seconds
            setTimeout(() => {
              copyIcon.classList.remove('hidden');
              checkIcon.classList.add('hidden');
            }, 2000);
          } catch (err) {
            console.error('Failed to copy code:', err);
          }
        });
        
        pre.parentElement.appendChild(button);
      });
    };

    // Add buttons after a short delay to ensure content is rendered
    const timer = setTimeout(addCopyButtons, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
}