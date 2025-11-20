'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import sampleData from '../../../../data/qrAnalyticsSample.json';

type AnalyticsData = {
    id: string;
    label: string;
    target: string;
    totalHits: number;
    uniqueVisitors: number;
    lastScan: string;
};

export default function AnalyticsPage() {
    const [data, setData] = useState<AnalyticsData[]>([]);

    useEffect(() => {
        // In a real app, you'd fetch this from an API
        setData(sampleData);
    }, []);

    const totalScans = data.reduce((acc, curr) => acc + curr.totalHits, 0);
    const totalUnique = data.reduce((acc, curr) => acc + curr.uniqueVisitors, 0);

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">QR Analytics Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalScans}</div>
                        <p className="text-xs text-muted-foreground">
                            Across all active campaigns
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Unique Visitors
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUnique}</div>
                        <p className="text-xs text-muted-foreground">
                            Estimated unique devices
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Campaigns
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.length}</div>
                        <p className="text-xs text-muted-foreground">
                            Tracking {data.length} QR codes
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Label</TableHead>
                                <TableHead>Target URL</TableHead>
                                <TableHead className="text-right">Total Hits</TableHead>
                                <TableHead className="text-right">Unique</TableHead>
                                <TableHead className="text-right">Last Scan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.label}</TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">
                                        {item.target}
                                    </TableCell>
                                    <TableCell className="text-right">{item.totalHits}</TableCell>
                                    <TableCell className="text-right">
                                        {item.uniqueVisitors}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {new Date(item.lastScan).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
