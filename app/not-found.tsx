import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-4">
              <AlertCircle className="w-12 h-12 text-destructive" />
              <div>
                <h2 className="font-semibold text-lg mb-2 text-foreground">
                  Page Not Found
                </h2>
                <p className="text-muted-foreground mb-4">
                  The page you are looking for does not exist. It might have been moved or deleted.
                </p>
              </div>
              <Link href="/" className="w-full">
                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2">
                  <ArrowLeft size={16} />
                  Back to Products
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
