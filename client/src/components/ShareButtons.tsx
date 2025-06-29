import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Twitter, Linkedin, Facebook, Link, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
  className?: string;
}

export function ShareButtons({ title, url, description, className = "" }: ShareButtonsProps) {
  const { toast } = useToast();
  const currentUrl = url || window.location.href;
  const shareText = description || `Check out this article: ${title}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedText = encodeURIComponent(shareText);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the link manually from your browser.",
        variant: "destructive",
      });
    }
  };

  const shareButtons = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`,
      color: 'hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
      color: 'hover:bg-blue-50 hover:text-blue-800 dark:hover:bg-blue-900/20',
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
      color: 'hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-gray-700/50',
    },
  ];

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mr-2">
        <Share2 className="w-4 h-4 mr-1" />
        Share:
      </div>
      
      {shareButtons.map((button) => (
        <Button
          key={button.name}
          variant="ghost"
          size="sm"
          className={`p-2 transition-colors ${button.color}`}
          onClick={() => window.open(button.url, '_blank', 'noopener,noreferrer')}
          title={`Share on ${button.name}`}
        >
          <button.icon className="w-4 h-4" />
        </Button>
      ))}
      
      <Button
        variant="ghost"
        size="sm"
        className="p-2 hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-gray-700/50 transition-colors"
        onClick={copyToClipboard}
        title="Copy link"
      >
        <Link className="w-4 h-4" />
      </Button>
    </div>
  );
}