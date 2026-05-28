import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    maskEmail(email: string):string{
        const [localPart, domain] = email.split('@');

        if(!localPart || !domain){
            throw new Error("format email incorrect");
        }

        const visibleChars = 2;

        const visible = localPart.slice(0,visibleChars);
        const masked = '*'.repeat(
            Math.max(localPart.length - visibleChars, 0)
        );

        return `${visible}${masked}@${domain}`;
    }
}
