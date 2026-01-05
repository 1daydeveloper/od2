"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Copy, Mail, Info, Check, Eye, Code, Zap, FileText, Send, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TypographyH1, TypographyP, TypographyMuted, TypographyH3, TypographyLarge } from "@/components/ui/typography";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function TestMailContentPage() {
    const [selectedTemplate, setSelectedTemplate] = useState(EMAIL_TEMPLATES[1]); // Default to HTML Only
    const [iframeHeight, setIframeHeight] = useState("300px");

    const handleCopy = async (content, label = "Template") => {
        try {
            await navigator.clipboard.writeText(content);
            toast.success(`${label} copied to clipboard!`);

            // Track GA event for copy
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag("event", "template_copied", {
                    event_category: "test_mail",
                    event_label: selectedTemplate.id,
                    content_type: label
                });
            }
        } catch (err) {
            toast.error(`Failed to copy ${label.toLowerCase()}.`);
        }
    };

    const getTemplateIcon = (id) => {
        switch (id) {
            case 'plain-text': return <FileText className="w-4 h-4" />;
            case 'html-only': return <Code className="w-4 h-4" />;
            case 'html-inline-css': return <Zap className="w-4 h-4" />;
            case 'html-css-js': return <Code className="w-4 h-4" />;
            case 'otp-email': return <AlertTriangle className="w-4 h-4" />;
            case 'transactional-email': return <Send className="w-4 h-4" />;
            case 'promotional-email': return <Zap className="w-4 h-4" />;
            case 'spam-email': return <AlertTriangle className="w-4 h-4" />;
            case 'newsletter-email': return <Mail className="w-4 h-4" />;
            case 'multipart-email': return <Info className="w-4 h-4" />;
            default: return <Mail className="w-4 h-4" />;
        }
    };

    return (
        <div className="flex flex-col gap-6 min-h-screen py-6">
            <TypographyH1>Test Mail</TypographyH1>
            <TypographyP className="text-muted-foreground -mt-4">
                Preview and test professional email templates for free. Use these templates to verify how your emails will look in different clients, test your email sending infrastructure, or find inspiration for your next transactional or promotional email.
            </TypographyP>
            {/* Top Banner */}
            <Card className="bg-blue-600/10 border-blue-500/20 shadow-md overflow-hidden relative">
                <div className="absolute top-0 right-0 p-1">
                    <Badge className="bg-blue-600 text-white border-0">FREE SERVICE</Badge>
                </div>
                <CardContent className="p-4 sm:p-6 flex items-start gap-4">
                    <div className="hidden sm:flex bg-blue-600/20 p-2 rounded-full text-blue-600 flex-shrink-0">
                        <Info size={24} />
                    </div>
                    <div>
                        <TypographyLarge className="text-blue-600 dark:text-blue-400 flex items-center gap-2 mb-1">
                            🚀 Email Sending Test Service – Coming Soon
                        </TypographyLarge>
                        <TypographyP className="text-sm sm:text-base m-0 opacity-80">
                            We’re currently rolling out the <strong>Email Sending Test Service</strong>.
                            Soon, you will be able to send test emails directly from this dashboard to any inbox
                            <strong> absolutely free of cost</strong>.
                            For now, please copy and use the sample email templates below for your development and testing needs.
                        </TypographyP>
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar - Template List */}
                <div className="lg:w-1/3 flex flex-col gap-4">
                    <TypographyH3 className="text-xl font-bold flex items-center gap-2">
                        <Mail className="w-5 h-5 text-blue-600" />
                        Email Templates
                    </TypographyH3>

                    {/* Mobile Template Selector */}
                    <div className="lg:hidden">
                        <Select
                            value={selectedTemplate.id}
                            onValueChange={(val) => setSelectedTemplate(EMAIL_TEMPLATES.find(t => t.id === val))}
                        >
                            <SelectTrigger className="w-full h-12 bg-card border-border shadow-sm">
                                <SelectValue placeholder="Select a template" />
                            </SelectTrigger>
                            <SelectContent>
                                {EMAIL_TEMPLATES.map((template) => (
                                    <SelectItem key={template.id} value={template.id}>
                                        <div className="flex items-center gap-2">
                                            <span className="text-blue-600">
                                                {getTemplateIcon(template.id)}
                                            </span>
                                            <span>{template.title}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="hidden lg:grid grid-cols-1 gap-2 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                        {EMAIL_TEMPLATES.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => setSelectedTemplate(template)}
                                className={`flex flex-col items-start p-4 rounded-lg border text-left transition-all duration-200 ${selectedTemplate.id === template.id
                                    ? "bg-blue-600/10 border-blue-500 ring-1 ring-blue-500 shadow-sm"
                                    : "bg-card border-border hover:bg-muted/50"
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`${selectedTemplate.id === template.id ? "text-blue-600" : "text-muted-foreground"}`}>
                                        {getTemplateIcon(template.id)}
                                    </span>
                                    <span className={`font-semibold ${selectedTemplate.id === template.id ? "text-blue-600" : ""}`}>
                                        {template.title}
                                    </span>
                                </div>
                                <TypographyMuted className="text-xs line-clamp-1">
                                    {template.description}
                                </TypographyMuted>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content - Preview & Copy */}
                <div className="lg:w-2/3 flex flex-col gap-4">
                    <Card className="shadow-lg border-border/50">
                        <CardHeader className="pb-4 border-b border-border/50">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                        {selectedTemplate.title}
                                        <Badge variant="outline" className="ml-2">
                                            {selectedTemplate.id === 'multipart-email' ? 'Multipart' : selectedTemplate.type.split('/')[1].toUpperCase()}
                                        </Badge>
                                    </CardTitle>
                                    <CardDescription className="mt-1">
                                        {selectedTemplate.description}
                                    </CardDescription>
                                </div>
                                <Button
                                    onClick={() => handleCopy(selectedTemplate.content, "Body")}
                                    className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 shadow-md transition-all active:scale-95"
                                >
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy Template
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {/* Subject Section */}
                            <div className="p-4 sm:p-6 bg-blue-600/5 border-b border-border/50">
                                <TypographyLarge className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                    Subject
                                </TypographyLarge>
                                <div className="flex items-center justify-between gap-4 p-3 bg-card border border-border rounded-lg shadow-sm">
                                    <code className="text-sm sm:text-base font-medium truncate">
                                        {selectedTemplate.subject}
                                    </code>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleCopy(selectedTemplate.subject, "Subject")}
                                        className="shrink-0 hover:bg-blue-600 hover:text-white transition-colors"
                                    >
                                        <Copy className="w-3.5 h-3.5 mr-2" />
                                        Copy
                                    </Button>
                                </div>
                            </div>

                            {selectedTemplate.note && (
                                <div className="bg-yellow-500/10 border-y border-yellow-500/20 p-3 flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-400">
                                    <AlertTriangle className="w-4 h-4 shrink-0" />
                                    <span><strong>Note:</strong> {selectedTemplate.note}</span>
                                </div>
                            )}

                            <div className="p-4 sm:p-6 bg-muted/30">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <TypographyLarge className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                            <Eye className="w-4 h-4" />
                                            Preview
                                        </TypographyLarge>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleCopy(selectedTemplate.content, "Preview Content")}
                                            className="h-6 w-6 p-0 hover:bg-blue-600/10 hover:text-blue-600 rounded-full"
                                            title="Copy Preview Content"
                                        >
                                            <Copy className="w-3 h-3" />
                                        </Button>
                                    </div>
                                    <TypographyMuted className="text-xs">
                                        Scrollable Area
                                    </TypographyMuted>
                                </div>

                                <div className="bg-white rounded-lg border border-border/50 shadow-inner overflow-hidden min-h-[300px] relative">
                                    {selectedTemplate.id === 'plain-text' ? (
                                        <div className="p-8 text-slate-700 bg-slate-50 min-h-[300px] font-mono leading-relaxed">
                                            <div className="max-w-2xl mx-auto space-y-4">
                                                {selectedTemplate.content.split('\n').map((line, i) => (
                                                    <p key={i} className="m-0 min-h-[1.5em]">{line}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ) : selectedTemplate.type === 'text/plain' ? (
                                        <pre className="p-6 text-slate-800 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                                            {selectedTemplate.content}
                                        </pre>
                                    ) : (
                                        <iframe
                                            srcDoc={selectedTemplate.content}
                                            title="Email Preview"
                                            className="w-full border-0"
                                            style={{ height: iframeHeight }}
                                            onLoad={(e) => {
                                                try {
                                                    const doc = e.target.contentDocument || e.target.contentWindow.document;
                                                    if (doc && doc.body) {
                                                        const height = Math.max(doc.body.scrollHeight, 300);
                                                        setIframeHeight(`${height + 40}px`);
                                                    }
                                                } catch (error) {
                                                    setIframeHeight("400px");
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Code View */}
                            <div className="p-4 sm:p-6 border-t border-border/50">
                                <div className="flex items-center gap-2 mb-4">
                                    <TypographyLarge className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                        <Code className="w-4 h-4" />
                                        Raw Content
                                    </TypographyLarge>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleCopy(selectedTemplate.content, "Raw Content")}
                                        className="h-6 w-6 p-0 hover:bg-blue-600/10 hover:text-blue-600 rounded-full"
                                        title="Copy Raw Content"
                                    >
                                        <Copy className="w-3 h-3" />
                                    </Button>
                                </div>
                                <div className="relative group">
                                    <pre className="bg-slate-950 dark:bg-slate-900 text-slate-200 p-4 rounded-lg overflow-x-auto text-sm font-mono max-h-[400px] thin-scrollbar border border-slate-800 dark:border-slate-700">
                                        <code className="block whitespace-pre">
                                            {selectedTemplate.content}
                                        </code>
                                    </pre>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleCopy(selectedTemplate.content, "Body")}
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-slate-100 hover:bg-slate-700"
                                    >
                                        <Copy className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Future Integration Placeholder */}
                            <div className="p-6 border-t border-border/50 bg-blue-600/5">
                                <div className="flex items-center gap-3 opacity-70">
                                    <div className="p-2 bg-blue-100 rounded-md">
                                        <Send className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <TypographyLarge className="text-sm font-bold text-blue-800 dark:text-blue-300">
                                            Send Test Email (Beta Coming Soon)
                                        </TypographyLarge>
                                        <TypographyMuted className="text-xs">
                                            SMTP / API integration will allow direct testing to your inbox for <strong>absolutely no cost</strong>.
                                        </TypographyMuted>
                                    </div>
                                    <Badge className="ml-auto bg-green-500 text-white">FREE</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* SEO Descriptive Text */}
                    <Card className="mt-4 border-dashed border-border/50">
                        <CardContent className="p-6 text-sm text-muted-foreground prose dark:prose-invert max-w-none">
                            <h4 className="text-base font-bold text-foreground">Why use our Test Mail Service?</h4>
                            <p>
                                Developing email notifications requires consistent testing across various formats and email clients.
                                Our <strong>Free Email Content Test Tool</strong> provides production-ready templates for the most common use cases,
                                including 2FA verification codes, order receipts, and newsletter updates.
                            </p>
                            <p>
                                We are also launching an <strong>Email Sending Test API</strong> that will allow you to trigger real test emails to any address
                                without setting up your own SMTP server or paying for expensive ESP trials. High deliverability and zero cost –
                                that&apos;s the One Day Developers promise.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
