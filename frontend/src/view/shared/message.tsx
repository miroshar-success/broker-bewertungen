let notistakEnqueueSnackbar;

export default class Message {
  static registerNotistakEnqueueSnackbar(instance) {
    notistakEnqueueSnackbar = instance;
  }

  static success(arg, autoHideDuration = 3000) {
    notistakEnqueueSnackbar(arg, {
      variant: 'success',
      autoHideDuration,
    });
  }

  static error(arg, autoHideDuration = 3000) {
    notistakEnqueueSnackbar(arg, {
      variant: 'error',
      autoHideDuration,
    });
  }
}
