export interface SocialMediaLink {
    platform: string;
    handle: string;
    url: string;
    icon: 'instagram' | 'facebook' | 'twitter' | 'youtube' | 'tiktok' | 'linkedin' | 'globe';
}

/**
 * Parses a social media URL to extract platform and handle
 */
export function parseSocialMediaLink(url: string): SocialMediaLink {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();
        const pathname = urlObj.pathname;

        // Instagram
        if (hostname.includes('instagram.com')) {
            const match = pathname.match(/\/([\w.]+)\/?/);
            const handle = match ? match[1] : '';
            return {
                platform: 'Instagram',
                handle: handle ? `@${handle}` : urlObj.hostname,
                url,
                icon: 'instagram'
            };
        }

        // Facebook
        if (hostname.includes('facebook.com')) {
            const match = pathname.match(/\/([\w.]+)\/?/);
            const handle = match ? match[1] : '';
            return {
                platform: 'Facebook',
                handle: handle === 'groups' ? 'Group' : (handle || urlObj.hostname),
                url,
                icon: 'facebook'
            };
        }

        // Twitter/X
        if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
            const match = pathname.match(/\/([\w]+)\/?/);
            const handle = match ? match[1] : '';
            return {
                platform: 'Twitter',
                handle: handle ? `@${handle}` : urlObj.hostname,
                url,
                icon: 'twitter'
            };
        }

        // YouTube
        if (hostname.includes('youtube.com')) {
            const match = pathname.match(/\/([\w@]+)\/?/);
            const handle = match ? match[1] : '';
            return {
                platform: 'YouTube',
                handle: handle || urlObj.hostname,
                url,
                icon: 'youtube'
            };
        }

        // TikTok
        if (hostname.includes('tiktok.com')) {
            const match = pathname.match(/\/@?([\w.]+)\/?/);
            const handle = match ? match[1] : '';
            return {
                platform: 'TikTok',
                handle: handle ? `@${handle}` : urlObj.hostname,
                url,
                icon: 'tiktok'
            };
        }

        // LinkedIn
        if (hostname.includes('linkedin.com')) {
            const match = pathname.match(/\/in\/([\w-]+)\/?/);
            const handle = match ? match[1] : '';
            return {
                platform: 'LinkedIn',
                handle: handle || urlObj.hostname,
                url,
                icon: 'linkedin'
            };
        }

        // Default/Unknown
        return {
            platform: urlObj.hostname,
            handle: urlObj.hostname,
            url,
            icon: 'globe'
        };
    } catch (error) {
        // If URL parsing fails, return a fallback
        return {
            platform: 'Link',
            handle: url,
            url,
            icon: 'globe'
        };
    }
}
