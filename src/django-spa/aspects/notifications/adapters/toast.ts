// eslint-disable-next-line max-classes-per-file
import {
  CreateStandAloneToastParam,
  createStandaloneToast, IToast,
} from "@chakra-ui/react";
import {BaseNotification} from './base'
import { NotificationsHandler } from "../types"
import { NotificationStatus } from "../Enums"

type ToastConfigType = CreateStandAloneToastParam

class ToastHandler implements NotificationsHandler {
  toast: Function

  constructor(toast: Function) {
    this.toast = toast
  }

  notify(params: IToast): void {
    this.toast(params)
  }

  info(params: IToast): void {
    this.toast({status: NotificationStatus.INFO, ...params})
  }

  warning(params: IToast): void {
    this.toast({status: NotificationStatus.WARNING, ...params})
  }

  success(params: IToast): void {
    this.toast({status: NotificationStatus.SUCCESS, ...params})
  }

  error(params: IToast): void {
    this.toast({status: NotificationStatus.ERROR, ...params})
  }
}

class ToastNotification extends BaseNotification<ToastConfigType, ToastHandler> {
  initialize(config: ToastConfigType): ToastHandler {
    const toaster = createStandaloneToast(config)
    return new ToastHandler(toaster)
  }

  notify = (params: IToast): void => {
    this.notificationHandler.notify(params)
  }

  info = (params: IToast): void => {
    this.notificationHandler.info(params)
  }

  warning = (params: IToast): void => {
    this.notificationHandler.warning(params)
  }

  success = (params: IToast): void => {
    this.notificationHandler.success(params)
  }

  error = (params: IToast): void => {
    this.notificationHandler.error(params)
  }
}

export { ToastNotification, ToastConfigType }
