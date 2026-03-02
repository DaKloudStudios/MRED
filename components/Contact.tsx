
import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants.tsx';
import './NeonButton.css';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: 'Commercial Construction',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsSuccess(false);
        setErrorMessage('');

        const formElement = e.currentTarget;
        const data = new FormData(formElement);

        try {
            const response = await fetch('https://www.myinvoks.com/api/submit/cmm9ar5v40001yieir7hpg5vn', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setIsSuccess(true);
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    subject: 'Commercial Construction',
                    message: ''
                });
            } else {
                setErrorMessage('There was an error sending the form. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Network error when trying to send the message.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto min-h-[90vh] flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 w-full">

                {/* Left Column: Info */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                    <h2 className="text-xs uppercase tracking-[0.25em] font-bold text-red-600 mb-6">
                        Get in Touch
                    </h2>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-16 leading-tight">
                        Let's discuss your next project.
                    </h1>

                    <div className="space-y-10">
                        {/* Address */}
                        <div className="flex gap-6 items-start group">
                            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-red-600/50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Office Address</h4>
                                <p className="text-lg text-white font-light leading-relaxed">
                                    {CONTACT_INFO.address.split(',')[0]}<br />
                                    {CONTACT_INFO.address.split(',').slice(1).join(',')}
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex gap-6 items-start group">
                            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-red-600/50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.57A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Phone Number</h4>
                                <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`} className="text-lg text-white font-light hover:text-red-600 transition-colors">
                                    {CONTACT_INFO.phone}
                                </a>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex gap-6 items-start group">
                            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-red-600/50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Email Address</h4>
                                <a href={`mailto:${CONTACT_INFO.email}`} className="text-lg text-white font-light hover:text-red-600 transition-colors">
                                    {CONTACT_INFO.email}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="lg:col-span-7">
                    <div className="bg-zinc-900/80 backdrop-blur-sm border border-white/5 p-8 md:p-10 lg:p-12 rounded-2xl">
                        <form className="space-y-8" onSubmit={handleSend}>
                            {isSuccess && (
                                <div className="bg-green-500/20 border border-green-500/50 text-green-400 p-4 rounded-md mb-6 text-sm text-center">
                                    Message sent successfully! We will get in touch soon.
                                </div>
                            )}
                            {errorMessage && (
                                <div className="bg-black/60 backdrop-blur-md border border-red-600 text-white p-4 rounded-md mb-6 text-sm text-center shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                                    {errorMessage}
                                </div>
                            )}
                            <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Name */}
                                <div className="group">
                                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block mb-3 group-focus-within:text-red-600 transition-colors">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Please fill out this field.')}
                                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                                        className="w-full bg-black/40 border border-white/10 text-white p-4 outline-none focus:border-red-600 transition-all font-light rounded-md placeholder-zinc-700"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                {/* Phone */}
                                <div className="group">
                                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block mb-3 group-focus-within:text-red-600 transition-colors">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-black/40 border border-white/10 text-white p-4 outline-none focus:border-red-600 transition-all font-light rounded-md placeholder-zinc-700"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                {/* Email - Full Width */}
                                <div className="group md:col-span-2">
                                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block mb-3 group-focus-within:text-red-600 transition-colors">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Please fill out this field.')}
                                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                                        className="w-full bg-black/40 border border-white/10 text-white p-4 outline-none focus:border-red-600 transition-all font-light rounded-md placeholder-zinc-700"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="group">
                                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block mb-3 group-focus-within:text-red-600 transition-colors">Subject</label>
                                <div className="relative">
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-black/40 border border-white/10 text-white p-4 outline-none focus:border-red-600 transition-all font-light rounded-md appearance-none cursor-pointer"
                                    >
                                        <option>Commercial Construction</option>
                                        <option>Design & Build</option>
                                        <option>Residential Remodel</option>
                                        <option>Tenant Improvement</option>
                                        <option>Other</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="group">
                                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block mb-3 group-focus-within:text-red-600 transition-colors">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onInvalid={(e) => (e.target as HTMLTextAreaElement).setCustomValidity('Please fill out this field.')}
                                    onInput={(e) => (e.target as HTMLTextAreaElement).setCustomValidity('')}
                                    rows={5}
                                    className="w-full bg-black/40 border border-white/10 text-white p-4 outline-none focus:border-red-600 transition-all font-light resize-none rounded-md placeholder-zinc-700"
                                    placeholder="Tell us about your project..."
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="neon-button disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                <div className="neon-border top"></div>
                                <div className="neon-border left"></div>
                                <div className="neon-border bottom"></div>
                                <div className="neon-border right"></div>
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;
