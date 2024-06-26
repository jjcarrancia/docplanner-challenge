# Payment fraction widget

Used React + Vite.
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Process

### Structure

First I identify the visual components, in this case I divided the page in three, the appointment details, the appointment table, and the reschedule button.
In the end I created an Arrow component with a spinning SVG cause it could be reused in three different places as well.

Then there's a decision to make about how to handle the data from the APIs. Since it's a small APP I decided to go with a container-presentation approach, the container fetches the information as well as posting the new appointment when necessary. I could have used a context with a custom hook to handle this, or go with Redux, but I decided to avoid big structures for such a small app.

A services folder to isolate the ts components with the fetch calls, and an assets folder to store the icons, in this case obtained from [SVG repo](https://www.svgrepo.com/vectors).

An utils folder used to include auxiliar functions such as the ones related to dates handling (for which I've used date-fns, a very light and well written library), and for sorting the appointments by grouping them by date.

### Testing

I used Vitest, since I was already using Vite, along with @testing-library/react. Pretty standard setup nowadays, very fast and easy to use.

I included the coverage folder so whoever reviews this can take a look at it, it's over 85%. I could have tried for 100% but I think it's a good percentage for the time being.

- [Vitest](https://vitest.dev/)
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)

#### More detailed instructions:

To setup and run the project the user will have to:

- Run `npm install` at the root.
- Run `npm run dev` and open the link in the console.

## Problems and timing issues

- As mentioned earlier, with a bit more time the testing coverage would have been higher.
- The animations could have been better, I didn't include any for the next week/previous week arrows.
- I imagine with the conversation we had on the first call that event logging would have been a great addition, to control the funnel and focus the development efforts in the parts with a bigger drop-off.
