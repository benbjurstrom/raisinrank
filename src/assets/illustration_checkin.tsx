// material
import { Box, BoxProps } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ----------------------------------------------------------------------

export default function CheckInIllustration({ ...other }: BoxProps) {
  const theme = useTheme()
  const PRIMARY_LIGHTER = theme.palette.primary.lighter
  const PRIMARY_MAIN = theme.palette.primary.main
  const PRIMARY_DARK = theme.palette.primary.dark
  const PRIMARY_DARKER = theme.palette.primary.darker

  return (
    <Box {...other}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 200">
        <path
          fill={PRIMARY_MAIN}
          d="M129.948 130.751a4.977 4.977 0 00-4.865 3.938h6.937v17.409h-6.937a4.973 4.973 0 009.839-1.036v-15.337a4.97 4.97 0 00-3.071-4.595 4.97 4.97 0 00-1.903-.379z"
        />
        <path
          fill={PRIMARY_MAIN}
          d="M74.02 100.285a8.957 8.957 0 00-8.943 8.943v68.746a8.955 8.955 0 008.943 8.943h43.461a8.954 8.954 0 008.943-8.943v-68.746a8.954 8.954 0 00-8.943-8.943h-43.46z"
        />
        <path
          fill={PRIMARY_MAIN}
          d="M69.43 195a4.56 4.56 0 100-9.119 4.56 4.56 0 000 9.119zM120.414 195a4.559 4.559 0 100-9.118 4.559 4.559 0 000 9.118z"
        />
        <path
          fill={PRIMARY_DARK}
          d="M75.233 99.663h-2.487v87.461h2.487v-87.46zM82.279 99.663h-2.487v87.461h2.487v-87.46zM89.326 99.663h-2.487v87.461h2.487v-87.46zM96.372 99.663h-2.487v87.461h2.487v-87.46zM103.419 99.663h-2.487v87.461h2.487v-87.46zM110.466 99.663h-2.487v87.461h2.487v-87.46zM117.512 99.663h-2.487v87.461h2.487v-87.46z"
        />
        <path
          fill={PRIMARY_DARKER}
          d="M116.844 93.031a17.994 17.994 0 002.482-9.12H75.284c0 3.207.857 6.356 2.482 9.12h-8.958c0 4.807 4.06 8.705 9.067 8.705h11.097a20.19 20.19 0 005.742.829h5.182a20.184 20.184 0 005.742-.829h11.097c5.008 0 9.067-3.898 9.067-8.705h-8.958zM84.312 155.829a4.39 4.39 0 01-2.425 4.34l-.022.012c-4.145 2.365-7.538 4.221-11.564 3.879a2.649 2.649 0 01-2.398-2.363c-.042-.405.01-.814.153-1.196l5.726-10.89c3.327-3.875 5.67-3.879 9.741-.621l.79 6.839zM108.019 155.829a4.387 4.387 0 002.425 4.34l.022.012c4.145 2.365 7.538 4.221 11.564 3.879a2.653 2.653 0 002.004-1.223 2.656 2.656 0 00.241-2.336l-5.726-10.89c-3.327-3.875-5.671-3.879-9.741-.621l-.789 6.839zM91.376 27.539H75.442a3.358 3.358 0 01-3.22-2.386c-.491-1.635-1.125-3.222-1.135-4.66-.039-5.586.239-9.14 2.695-11.4C81.964 2.89 87.893 4.03 93.47 10.544c1.958 3.64 1.455 9.07.396 14.907a2.535 2.535 0 01-2.491 2.088z"
        />
        <path
          fill="#FBCDBE"
          d="M83.108 34.586c5.952 0 10.777-4.825 10.777-10.778 0-5.952-4.825-10.777-10.777-10.777-5.952 0-10.777 4.825-10.777 10.777 0 5.953 4.825 10.778 10.777 10.778z"
        />
        <path
          fill="#FBCDBE"
          d="M91.398 45.363l-14.922.414-1.244-16.166 14.508-.414 1.658 16.166z"
        />
        <path
          fill={PRIMARY_DARK}
          d="M116.683 83.912l-10.296 4.766c-1.726 4.093-4.104 3.975-7.113-.206-2.872 5.029-9.057 2.015-12.079-.182a13.913 13.913 0 00-12.584-.026L63.626 39.56c3.386-2.911 7.898-4.74 12.228-6.01l8.498 10.57 5.803-10.363c4.033-3.243 9.699-3.25 15.751-2.487l3.534 18.893c-2.331 14.903 1.174 22.378 7.243 33.749z"
        />
        <path
          fill={PRIMARY_DARKER}
          d="M82.694 148.161l-8.705.829-12.895-56.993a9.028 9.028 0 018.813-10.987 9.03 9.03 0 018.951 10.211l-1.553 11.758 5.389 45.182zM108.808 148.99l8.704-.415 12.895-56.577a9.02 9.02 0 00-4.907-10.099 9.031 9.031 0 00-12.547 5.522 9.046 9.046 0 00-.31 3.8l1.553 11.758-5.388 46.011z"
        />
        <path
          fill="#FBCDBE"
          d="M137.101 67.199l-7.361 18.993c-4.024-3.077-7.269-3.497-11.733-1.865-1.234-.172-2.153-2.885-2.153-4.131a2.496 2.496 0 012.383-2.494l6.736-.306a35.046 35.046 0 002.223-10.064 19.047 19.047 0 019.905-.133z"
        />
        <path
          fill={PRIMARY_DARK}
          d="M137.823 67.746l1.795-6.695a11.274 11.274 0 00-5.085-13.19L105.906 31.27l-.414 18.238 21.14 9.119a37.5 37.5 0 01.564 9.418c3.298-.98 7.322-1.188 10.627-.299z"
        />
        <path
          fill={PRIMARY_DARKER}
          d="M93.678 17.798l-11.191 2.073a7.875 7.875 0 01-7.876-7.876h19.482l-.415 5.803z"
        />
        <path
          fill="#FBCDBE"
          d="M73.16 21.943c.572 0 1.036-.928 1.036-2.072 0-1.145-.464-2.073-1.036-2.073-.572 0-1.036.928-1.036 2.073 0 1.144.464 2.072 1.036 2.072z"
        />
        <path
          fill={PRIMARY_LIGHTER}
          d="M107.357 52.858h-.12V49.56a1.908 1.908 0 00-1.909-1.908h-6.986a1.909 1.909 0 00-1.909 1.908v18.091a1.91 1.91 0 001.909 1.909h6.986a1.904 1.904 0 001.763-1.179c.096-.231.146-.48.146-.73V55.205h.12v-2.347z"
        />
        <path
          fill={PRIMARY_DARK}
          d="M101.554 54.69a1.658 1.658 0 100-3.318 1.658 1.658 0 000 3.317z"
        />
        <path
          fill="#FBCDBE"
          d="M100.103 68.16c-8.527 6.694-17.075 12.265-23.42 13.058l-1.036-11.4c6.093-.877 14.24-4.892 22.798-9.533l4.185-2.176a4.6 4.6 0 016.712 3.73 4.603 4.603 0 01-3.427 4.806l-5.812 1.516z"
        />
        <path
          fill={PRIMARY_DARK}
          d="M83.937 81.425l-16.995.414C61.224 70.621 59.15 58.65 60.31 46.01a8.355 8.355 0 013.6-6.87l1.789-1.238c7.65 11.356 12.395 21.902 10.777 30.673l4.974-.414c-3.221 4.347-1.73 8.78 2.487 13.264z"
        />
      </svg>
    </Box>
  )
}
