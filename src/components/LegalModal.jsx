import React, { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { X } from 'lucide-react';
const LegalModal = ({ isOpen, closeModal, title, children }) => {

  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal} className="relative z-50" >
            <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </TransitionChild>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-primary-white dark:bg-zinc-900 border border-primary-dark dark:border-white/10 p-6 text-left align-middle shadow-2xl transition-all">
                        <div className="flex items-center justify-between mb-6 border-b border-primary-dark/10 dark:border-white/10 pb-4">
                        <DialogTitle
                            as="h3"
                            className="text-2xl font-bold text-primary-dark dark:text-white"
                        >
                            {title}
                        </DialogTitle>
                        <button
                            onClick={closeModal}
                            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none"
                            >
                             <X className='w-6 h-6 text-gray-500 dark:text-gray-400' />
                            </button>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar text-sm sm:text-base text-primary-dark dark:text-gray-300 space-y-4">
                            {children}
                        </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </Transition>
  )
}

export default LegalModal