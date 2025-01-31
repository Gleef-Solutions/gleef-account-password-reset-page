import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://fgfrztymfdbzylchdjps.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZnJ6dHltZmRienlsY2hkanBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NjY0NDAsImV4cCI6MjAyOTQ0MjQ0MH0.xZBbPdEugwctsPjL90vRZ1-kn8aYTobn4RWo93lPib0')

document.getElementById('reset-password-form')?.addEventListener('submit', async function(event) {
  event.preventDefault();

  const password = (document.getElementById('password') as HTMLInputElement).value;
  const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

    try {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        alert('Invalid link. Please try again and make sure to use a valid access link.');
        console.log(sessionError)
        return;
      } else if(data) {
        const {error: updateError} = await supabase.auth.updateUser({password});
        if (!updateError) {
          const successMessage = document.querySelector('.success-message') as HTMLElement;
          if (successMessage) successMessage.style.display = 'block';
        } else {
          alert('Error resetting password: ' + updateError.message);
        }
      }
    } catch (error: any) {
      alert('Error resetting password: ' + error.message);
    }
});
